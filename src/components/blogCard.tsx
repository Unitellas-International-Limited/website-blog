import React from "react";
import Image from "next/image";

interface BlogCardProps {
  name: string;
  content: string;
  image: string;
}
const BlogCard: React.FC<BlogCardProps> = ({ name, content, image }) => {
  return (
    <div className="pb-4 rounded-2xl cursor-pointer shadow-md mb-10">
      <Image src={image} className="rounded-t-2xl" alt={name} />

      <p className="text-center font-main text-2xl py-2">{name}</p>
      <p className="truncate max-h-20 h-full px-2 pb-5">{content}</p>

      <div className="flex items-center w-full">
        <p className="pl-2">Read More arrow</p>
        <p className="ml-auto mx-1">Author</p>
      </div>
    </div>
  );
};
export default BlogCard;
