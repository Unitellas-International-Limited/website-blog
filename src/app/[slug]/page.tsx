// app/[slug]/page.tsx
import { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPost from "./blogPost";

interface Params {
  slug: string;
}

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

// Fix the parameter type here — destructure params with type
export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return {
      title: "Post not found | Unitellas Blog",
      description: "This blog is unavailable.",
    };
  }

  return {
    title: `${post.Blog_Title} | Unitellas Blog`,
    description: post.Blog_Content_Paragraph_1.slice(0, 160),
    openGraph: {
      title: post.Blog_Title,
      description:
        post.Blog_Content_Paragraph_1?.slice(0, 160) ??
        "Read the latest news on Unitellas Blog.",
      images: [
        {
          url: `https://blog.unitellas.com.ng/api/display-image?image=${encodeURIComponent(
            post.Blog_Image
          )}`,
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
      description: post.Blog_Content_Paragraph_1.slice(0, 160),
      images: [
        `https://blog.unitellas.com.ng/api/display-image?image=${encodeURIComponent(
          post.Blog_Image
        )}`,
      ],
    },
    robots: { index: true },
  };
}

// For the page component — type the params properly
export default async function BlogPostPage({ params }: { params: Params }) {
  const post = await getPostBySlug(params.slug);

  if (!post) return notFound();

  return <BlogPost post={post} />;
}
