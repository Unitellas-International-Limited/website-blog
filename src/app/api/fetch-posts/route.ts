import { NextResponse } from "next/server";

let cachedAccessToken: string | null = null;
let tokenExpiryTime = 0;

async function getAccessToken() {
  const now = Date.now();

  if (cachedAccessToken && now < tokenExpiryTime) {
    return cachedAccessToken;
  }

  const res = await fetch(`https://accounts.zoho.com/oauth/v2/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      refresh_token: process.env.ZOHO_CREATOR_REFRESH_TOKEN as string,
      client_id: process.env.NEXT_PUBLIC_ZOHO_CREATOR_CLIENT_ID as string,
      client_secret: process.env.ZOHO_CREATOR_CLIENT_SECRET as string,
      redirect_uri: "http://localhost:3000",
      grant_type: "refresh_token",
    }),
  });

  const data = await res.json();

  if (!data.access_token) {
    console.error("Zoho Access Token Error:", data);
    throw new Error("Failed to get access token from Zoho");
  }

  cachedAccessToken = data.access_token;
  tokenExpiryTime = now + data.expires_in * 1000;

  return cachedAccessToken;
}

export async function GET() {
  try {
    const access_token = await getAccessToken();

    const response = await fetch(
      `https://creatorapp.zoho.com/api/v2/apps_unitellas/unitellas-blog-backend/report/All_Blog_Posts`,
      {
        method: "GET",
        headers: {
          Authorization: `Zoho-oauthtoken ${access_token}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error("Error fetching Zoho Creator posts");
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}
