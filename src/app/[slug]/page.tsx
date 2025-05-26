import { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPost from "./blogPost";

type Props = {
  params: {
    slug: string;
  };
};

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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
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

export default async function BlogPostPage({ params }: Props) {
  const post = await getPostBySlug(params.slug);
  if (!post) return notFound();

  return <BlogPost post={post} />;
}
