"use client";

import { useState, useEffect } from "react";
import PageHeader from "@/components/pageHeader";
import SearchBar from "@/components/searchBar";
import Link from "next/link";
import Image from "next/image";
interface Post {
  ID: string;
  Blog_Title: string;
  Blog_Content_Paragraph_1: string;
  Blog_Content_Paragraph_2: string;
  Blog_Content_Paragraph_3: string;
  Blog_Image: string;
  Author: string;
  Date_Published: string;
  Url_SEO: string;
}

const Blog: React.FC = () => {
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [imgLoaded, setImgLoaded] = useState<{ [key: number]: boolean }>({});

  const handleImageLoad = (index: number) => {
    setImgLoaded((prev) => ({ ...prev, [index]: true }));
  };

  useEffect(() => {
    const getPosts = async () => {
      const res = await fetch("/api/fetch-posts");
      const data = await res.json();
      console.log(data);
      if (res.ok && data.data) {
        setAllPosts(data.data);
        setFilteredPosts(data.data);
        setLoading(false);
      } else {
        console.error("Error fetching posts: ", data);
        setLoading(false);
      }
    };

    getPosts();
  }, []);

  useEffect(() => {
    if (!allPosts.length) {
      return;
    }
    const lowerSearchQuery = searchQuery.trim().toLowerCase();

    if (!lowerSearchQuery) {
      setFilteredPosts(allPosts);
      return;
    }

    const filteredResults = allPosts.filter((post) => {
      return post.Blog_Title.toLowerCase().includes(lowerSearchQuery);
    });

    setFilteredPosts(filteredResults);
  }, [searchQuery, allPosts]);

  const subtitles = [
    "Resources and Insights",
    "The latest industry news, technologies, and resources from Unitellas Edge Cloud.",
  ];

  return (
    <div className="w-full">
      <PageHeader title="The Offical Unitellas Blog" subtitles={subtitles} />
      <SearchBar
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <div className="pt-3">
        {loading ? (
          <div className="font-main text-3xl text-center">Getting Blogs...</div>
        ) : filteredPosts.length === 0 ? (
          <p className="font-unsupported text-center text-3xl">
            No blogs available{" "}
            <span className={`${!searchQuery.trim() ? "hidden" : ""}`}>
              for &quot;{searchQuery}&quot;
            </span>{" "}
            at the moment.
          </p>
        ) : (
          <div className=" flex flex-wrap justify-center gap-6 px-2">
            {filteredPosts.map((post, index) => (
              <Link key={post.ID} href={`/${post.Url_SEO}`} passHref>
                <div className="w-[90%] md:w-[400px] max-w-[400px] pb-2 rounded-2xl cursor-pointer shadow-md shadow-gray-600 transform transition-transform duration-300 hover:-translate-y-2">
                  <div className="relative w-full h-64 rounded-t-2xl overflow-hidden">
                    <Image
                      src={`/api/display-image?image=${encodeURIComponent(
                        post.Blog_Image
                      )}`}
                      alt={post.Blog_Title}
                      fill
                      className="object-cover transition-opacity duration-700"
                      unoptimized
                      onLoad={() => handleImageLoad(index)}
                    />
                    {!imgLoaded[index] && (
                      <div className="absolute inset-0 bg-gray-300 animate-pulse z-0">
                        <Image
                          src="/assets/images/unitellasicon.png"
                          alt={post.Blog_Title}
                          width={200}
                          height={150}
                        />
                      </div>
                    )}
                  </div>
                  <p className="text-center font-main text-3xl pt-2">
                    {post.Blog_Title}
                  </p>
                  <p className="pb-4 text-sm text-[var(--color-primary)]/85 text-center capitalize font-medium">
                    {post.Date_Published}
                  </p>

                  {/* content preview */}
                  <p className="truncate-multiline max-h-[4.5rem] sm:max-h-[5.5rem] md:max-h-[6rem] lg:max-h-[7rem] overflow-hidden line-clamp-3 mx-4 mb-5">
                    {post.Blog_Content_Paragraph_1}
                  </p>

                  {/* bottom */}
                  <div className="flex items-center w-full px-3">
                    <Image
                      src={"/assets/images/unitellasicon.png"}
                      alt="Unitellas Icon"
                      width={40}
                      height={40}
                    />
                    <p className="ml-auto mx-1 text-sm">By {post.Author}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
