import { NextResponse } from "next/server";

interface Post {
  ID: string;
  Blog_Title: string;
  Blog_Content: string;
  Blog_Image: string;
  Author: { display_value: string };
  Date_Published: string;
  Url_SEO: string;
}

// Caching for access token
let cachedAccessToken: string | null = null;
let tokenExpiryTime = 0;

// Function to get the Zoho access token
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
      refresh_token: process.env.ZOHO_CREATOR_REFRESH_TOKEN!,
      client_id: process.env.ZOHO_CREATOR_CLIENT_ID!,
      client_secret: process.env.ZOHO_CREATOR_CLIENT_SECRET!,
      redirect_uri: "https://blog.unitellas.com.ng",
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
  console.log(cachedAccessToken);
  return cachedAccessToken;
}

async function fetchPostById(id: string, access_token: string | null) {
  const response = await fetch(
    `https://creatorapp.zoho.com/api/v2/apps_unitellas/unitellas-blog-backend/report/All_Blog_Posts/${id}`,
    {
      method: "GET",
      headers: {
        Authorization: `Zoho-oauthtoken ${access_token}`,
      },
    }
  );

  const data = await response.json();
  console.log(data);

  if (!response.ok) {
    throw new Error("Error fetching Zoho Creator post by ID");
  }

  return data;
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");

    if (!slug) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }

    const access_token = await getAccessToken();
    console.log(access_token);

    const postsResponse = await fetch(
      `https://creatorapp.zoho.com/api/v2/apps_unitellas/unitellas-blog-backend/report/All_Blog_Posts`,
      {
        method: "GET",
        headers: {
          Authorization: `Zoho-oauthtoken ${access_token}`,
        },
      }
    );
    const postsData = await postsResponse.json();

    if (!postsResponse.ok || !postsData.data) {
      return NextResponse.json(
        { error: "Failed to fetch post" },
        { status: 500 }
      );
    }

    const post = postsData.data.find((p: Post) => p.Url_SEO === slug);

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const postData = await fetchPostById(post.ID, access_token);

    return NextResponse.json(postData);
  } catch (error) {
    console.error("Error fetching post:", error);
    return NextResponse.json(
      { error: "Failed to fetch post" },
      { status: 500 }
    );
  }
}
