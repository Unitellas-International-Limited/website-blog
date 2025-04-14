// app/api/fetch-posts/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const access_token = process.env.ZOHO_ACCESS_TOKEN;

  try {
    const response = await fetch(
      `https://creatorapp.zoho.com/api/v2/sharon-unitellas/unitellas-blog-backend/forms/report/Posts`,
      {
        method: "GET", // Ensure the GET method is used for fetching data from Zoho
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
