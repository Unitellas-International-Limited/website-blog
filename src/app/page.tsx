"use client";

import { useState, useEffect } from "react";
import PageHeader from "@/components/pageHeader";
import Search from "@/components/searchBar";
import BlogCard from "@/components/blogCard";

interface Post {
  ID: string;
  Title: string;
  Content: string;
  Image: string;
}

const Blog: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPosts = async () => {
      const res = await fetch("/api/fetch-posts");
      const data = await res.json();
      console.log(data);
      if (res.ok && data.data) {
        setPosts(data.data); // Only set the posts if data.data is available
      } else {
        console.error("Error fetching posts: ", data);
      }
    };

    getPosts();
  }, []);

  const subtitles = [
    "Resources and Insights",
    "The latest industry news, interviews, technologies, and resources.",
  ];

  return (
    <div>
      <PageHeader title="The Offical Unitellas Blog" subtitles={subtitles} />
      <Search />

      <div className="flex flex-wrap justify-center items-center w-full gap-6 px-1 pt-3">
        {posts.length === 0 ? (
          <p className="font-main text-3xl">
            No blogs available at the moment.
          </p>
        ) : (
          posts.map((post) => (
            <div key={post.ID}>
              <BlogCard
                name={post.Title}
                content={post.Content}
                image={post.Image}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Blog;
