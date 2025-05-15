"use client";

import Image from "next/image";
import PageHeader from "@/components/pageHeader";

interface BlogPost {
  Blog_Title: string;
  Blog_Image: string;
  Blog_Video: string;
  Author: string;
  Blog_Content_Paragraph_1: string;
  Blog_Content_Paragraph_2: string;
  Blog_Content_Paragraph_3: string;
  Date_Published: string;
}

export default function BlogPost({ post }: { post: BlogPost }) {
  return (
    <section className="w-full">
      <PageHeader
        title={post.Blog_Title}
        subtitles={[`Author: ${post.Author}`]}
      />
      <p className="text-right text-xs font-bold px-3 py-1">
        Published on {post.Date_Published}
      </p>

      <div className="max-w-screen-xl space-y-9 mx-auto p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <p
            className={`text-md font-light mx-auto mt-7 ${
              post.Blog_Video === "" ? "col-span-2" : ""
            }`}
          >
            {post.Blog_Content_Paragraph_1}
          </p>
          {post.Blog_Video !== "" && (
            <div className="relative w-full md:h-full rounded-lg">
              <video
                className="w-full h-full object-cover rounded-lg"
                autoPlay
                playsInline
                muted
                loop
                preload="auto"
              >
                <source
                  src={`/assets/videos/${post.Blog_Video}`}
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="relative w-full h-72 md:h-full">
            <Image
              src={`/api/display-image?image=${encodeURIComponent(
                post.Blog_Image
              )}`}
              alt={post.Blog_Title}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
          <p className="text-md font-light mx-auto mt-7">
            {post.Blog_Content_Paragraph_2}
          </p>
        </div>

        <p className="text-md font-light mx-auto mt-7">
          {post.Blog_Content_Paragraph_3}
        </p>
      </div>
    </section>
  );
}
