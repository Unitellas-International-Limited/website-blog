import { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPost from "./blogPost";

async function getPostBySlug(slug: string) {
  const res = await fetch(
    `https://blog.unitellas.com.ng/api/fetch-post-by-slug?slug=${slug}`,
    {
      next: { revalidate: 60 },
    }
  );

  if (!res.ok) return null;

  const data = await res.json();
  return data?.data;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function generateMetadata({ params }: any): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return {
      title: "Post not found | Unitellas Blog",
      description: "This blog is unavailable.",
    };
  }

  const description =
    post.Blog_Content_Paragraph_1?.slice(0, 160) ??
    "Read the latest from Unitellas Blog";
  const imageUrl = `https://blog.unitellas.com.ng/api/display-image?image=${encodeURIComponent(
    post.Blog_Image
  )}`;

  return {
    title: `${post.Blog_Title} | Unitellas Blog`,
    description,
    openGraph: {
      title: post.Blog_Title,
      description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.Blog_Title,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: post.Blog_Title,
      description,
      images: [imageUrl],
    },
    robots: { index: true },
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function BlogPostPage({ params }: any) {
  const post = await getPostBySlug(params.slug);

  if (!post) return notFound();

  return <BlogPost post={post} />;
}
