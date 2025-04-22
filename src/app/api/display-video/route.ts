import { NextRequest, NextResponse } from "next/server";

let cachedAccessToken: string | null = null;
let tokenExpiryTime = 0;

// Function to get Zoho access token
async function getAccessToken() {
  const now = Date.now();

  if (cachedAccessToken && now < tokenExpiryTime) {
    return cachedAccessToken;
  }

  const res = await fetch(`https://accounts.zoho.com/oauth/v2/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      refresh_token: process.env.ZOHO_CREATOR_REFRESH_TOKEN!,
      client_id: process.env.ZOHO_CREATOR_CLIENT_ID!,
      client_secret: process.env.ZOHO_CREATOR_CLIENT_SECRET!,
      redirect_uri: "https://blog.unitellas.com.ng",
      grant_type: "refresh_token",
    }),
  });

  const data = await res.json();
  if (!data.access_token) throw new Error("Failed to fetch Zoho token");

  cachedAccessToken = data.access_token;
  tokenExpiryTime = now + data.expires_in * 1000;
  return cachedAccessToken;
}

// GET handler for video
export async function GET(req: NextRequest) {
  const rawVideo = req.nextUrl.searchParams.get("video");

  if (!rawVideo) {
    return NextResponse.json({ error: "Missing video param" }, { status: 400 });
  }

  const access_token = await getAccessToken();
  const zohoVideoUrl = `https://creatorapp.zoho.com${rawVideo}`;

  const headers: Record<string, string> = {
    Authorization: `Zoho-oauthtoken ${access_token}`,
  };

  const zohoRes = await fetch(zohoVideoUrl, { headers });

  const contentType = zohoRes.headers.get("Content-Type") || "";
  const contentLength = zohoRes.headers.get("Content-Length");

  if (!zohoRes.ok || !contentType.startsWith("video")) {
    const errorText = await zohoRes.text();
    console.error("Zoho returned non-video:", errorText);
    return NextResponse.json(
      { error: "The requested resource isn't a valid video" },
      { status: 400 }
    );
  }

  const responseHeaders = new Headers({
    "Content-Type": contentType,
    "Content-Length": contentLength || "0",
    "Cache-Control": "public, max-age=86400",
    "Content-Disposition": "inline",
  });

  const buffer = Buffer.from(await zohoRes.arrayBuffer());

  return new NextResponse(buffer, {
    status: 200,
    headers: responseHeaders,
  });
}
