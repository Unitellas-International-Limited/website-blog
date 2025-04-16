// app/api/fetch-image/route.ts

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
      redirect_uri: "https://unitellasblog.vercel.app",
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
  const rawImage = req.nextUrl.searchParams.get("image");

  if (!rawImage) {
    return NextResponse.json({ error: "Missing image param" }, { status: 400 });
  }

  const image = rawImage;
  console.log(image);
  const access_token = await getAccessToken();
  const zohoImageUrl = `https://creatorapp.zoho.com${image}`;

  const response = await fetch(zohoImageUrl, {
    headers: {
      Authorization: `Zoho-oauthtoken ${access_token}`,
    },
  });

  const contentType = response.headers.get("Content-Type") || "";

  if (!response.ok || !contentType.startsWith("image")) {
    const errorText = await response.text();
    console.error("Zoho returned non-image:", errorText);
    return NextResponse.json(
      { error: "The requested resource isn't a valid image" },
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
