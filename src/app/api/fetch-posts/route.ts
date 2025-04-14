import { NextResponse } from "next/server";

async function getAccessToken() {
  const res = await fetch(`${process.env.ZOHO_ACCOUNT_URL}/oauth/v2/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      refresh_token: process.env.ZOHO_REFRESH_TOKEN as string,
      client_id: process.env.ZOHO_CLIENT_ID as string,
      client_secret: process.env.ZOHO_CLIENT_SECRET as string,
      redirect_uri: "http:localhost:3000",
      grant_type: "refresh_token",
    }),
  });

  const data = await res.json();

  if (!data.access_token) {
    console.error("Zoho Access Token Error:", data);
    throw new Error("Failed to get access token from Zoho");
  }

  return data.access_token;
}

export async function GET() {
  const access_token = await getAccessToken();

  try {
    const response = await fetch(
      `https://creatorapp.zoho.com/api/v2/sharon-unitellas/unitellas-blog-backend/report/Posts`,
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

    return NextResponse.json(data.data);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}
