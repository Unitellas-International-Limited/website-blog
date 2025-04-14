"use client";

import { useState, useEffect } from "react";
import PageHeader from "@/components/pageHeader";
import Search from "@/components/searchBar";
import BlogCard from "@/components/blogCard";

interface Post {
  ID: string;
  Blog_Title: string;
  Blog_Content: string;
  Blog_Image: string;
  Author: { display_value: string };
  Date_Published: string;
  Url_SEO: string;
}

const Blog: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPosts = async () => {
      const res = await fetch("/api/fetch-posts");
      const data = await res.json();
      console.log(data);
      if (res.ok && data.data) {
        setPosts(data.data);
        setLoading(false);
      } else {
        console.error("Error fetching posts: ", data);
        setLoading(false);
      }
    };

    getPosts();
  }, []);

  const subtitles = [
    "Resources and Insights",
    "The latest industry news, technologies, and resources from Unitellas Edge Cloud.",
  ];

  return (
    <div>
      <PageHeader title="The Offical Unitellas Blog" subtitles={subtitles} />
      <Search />

      <div className="flex flex-wrap justify-center items-center w-full gap-6 px-1 pt-3">
        {loading && (
          <div className="font-main text-3xl m-auto">Getting Blogs..</div>
        )}

        {!loading && posts.length === 0 ? (
          <p className="font-main text-3xl">
            No blogs available at the moment.
          </p>
        ) : (
          posts.map((post) => (
            <div key={post.ID}>
              <BlogCard
                name={post.Blog_Title}
                content={post.Blog_Content}
                image={post.Blog_Image}
                author={post.Author?.display_value}
                date_published={post.Date_Published}
                seo_url={post.Url_SEO}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Blog;
