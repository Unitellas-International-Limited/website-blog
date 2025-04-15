"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import PageHeader from "@/components/pageHeader";

interface BlogPost {
  Blog_Title: string;
  Blog_Image: string;
  Author: string;
  Blog_Content_Paragraph_1: string;
  Blog_Content_Paragraph_2: string;
  Blog_Content_Paragraph_3: string;
  Date_Published: string;
}

export default function BlogPostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/fetch-post-by-slug?slug=${slug}`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Failed to load blog post");
        }
        setPost(data.data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.log(err.message);
        } else {
          console.log("Unknown error.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  return (
    <div className="w-full">
      {loading ? (
        <div className="font-main text-3xl text-center">Getting Blog...</div>
      ) : post ? (
        <>
          {" "}
          <PageHeader
            title={post.Blog_Title}
            subtitles={[`Author: ${post.Author}`]}
          />
          <p className="text-right text-xs font-bold px-3 py-1">
            Published on {post.Date_Published}
          </p>
          <div className="flex flex-col space-y-5 px-10 pt-2 pb-4">
            {/* top */}
            <p className="text-md font-light mx-auto mt-7 ">
              {post.Blog_Content_Paragraph_1}
            </p>

            {/* middle */}
            <div className="flex flex-col sm:flex-row gap-5">
              {" "}
              <Image src="" alt="" className="object-cover w-full h-auto" />
              <p className="text-md font-light mx-auto mt-7 ">
                {post.Blog_Content_Paragraph_2}
              </p>
            </div>

            {/* bottom */}
            <p className="text-md font-light mx-auto mt-7 ">
              {post.Blog_Content_Paragraph_3}
            </p>
          </div>
        </>
      ) : (
        <div className="font-main text-3xl text-center">
          Sorry, the blog is unavailable. Try again later.
        </div>
      )}
    </div>
  );
}
