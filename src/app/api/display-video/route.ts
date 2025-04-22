import { NextRequest, NextResponse } from "next/server";

let cachedAccessToken: string | null = null;
let tokenExpiryTime = 0;

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

export async function GET(req: NextRequest) {
  const rawVideo = req.nextUrl.searchParams.get("video");

  if (!rawVideo) {
    return NextResponse.json({ error: "Missing  param" }, { status: 400 });
  }

  const video = rawVideo;
  console.log(video);
  const access_token = await getAccessToken();
  const zohoVideoUrl = `https://creatorapp.zoho.com${video}`;

  const response = await fetch(zohoVideoUrl, {
    headers: {
      Authorization: `Zoho-oauthtoken ${access_token}`,
    },
  });

  const contentType = response.headers.get("Content-Type") || "";

  if (!response.ok || !contentType.startsWith("video")) {
    const errorText = await response.text();
    console.error("Zoho returned non-image:", errorText);
    return NextResponse.json(
      { error: "The requested resource isn't a valid video" },
      { status: 400 }
    );
  }

  const arrayBuffer = await response.arrayBuffer();
  return new NextResponse(Buffer.from(arrayBuffer), {
    headers: {
      "Content-Type": contentType,
      "Content-Disposition": "inline",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
