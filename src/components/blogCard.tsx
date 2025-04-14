import React from "react";
import Image from "next/image";
import { CircleArrowOutUpRightIcon } from "lucide-react";

interface BlogCardProps {
  name: string;
  content: string;
  image: string;
  author: string;
  date_published: string;
  seo_url: string;
  // readMoreLink: string;
}
const BlogCard: React.FC<BlogCardProps> = ({
  name,
  content,
  image,
  author,
  date_published,
  seo_url,
}) => {
  return (
    <div className="pb-2 max-w-[400px] rounded-2xl cursor-pointer shadow-md mb-10">
      <Image
        src={`https://creatorapp.zoho.com${image}`}
        width={300}
        height={300}
        className="rounded-t-2xl"
        alt={name}
      />

      <p className="text-center font-main text-2xl pt-2">{name}</p>
      <p className="pb-4 text-sm text-center capitalize font-medium">
        {date_published}
      </p>

      {/* content preview */}
      <p className="truncate px-3 py-5">{content}</p>

      {/* bottom */}
      <div className="flex items-center w-full px-2">
        <span title="Open Blog">
          <CircleArrowOutUpRightIcon
            size={18}
            className="flex items-center cursor-pointer text-[var(--color-primary)]"
          />
        </span>
        <p className="ml-auto mx-1 text-sm">By {author}</p>
        <p className="ml-auto mx-1 hidden">Url for SEO {seo_url}</p>
      </div>
    </div>
  );
};
export default BlogCard;
