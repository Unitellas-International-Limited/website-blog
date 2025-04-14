"use client";

import { useState, useEffect } from "react";
import PageHeader from "@/components/pageHeader";
import Search from "@/components/searchBar";
import BlogCard from "@/components/blogCard";

interface Post {
  id: string;
  name: string;
  content: string;
  image: string;
}
interface BlogProps {
  posts: Post[];
}
const Blog: React.FC<BlogProps> = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const getPosts = async () => {
      const res = await fetch("/api/fetch-posts");
      const data = await res.json();
      console.log(data);
      setPosts(data.data || []);
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
            <div key={post.id}>
              <BlogCard
                name={post.name}
                content={post.content}
                image={post.image}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Blog;
