"use client";
import { Search } from "lucide-react";

const SearchBar = () => {
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-[70%] rounded-xl p-3 text-sm flex gap-4 my-4 shadow-sm">
        <Search size={20} />
        <input
          type="text"
          placeholder="Search for blog posts using their title..."
          className="w-full outline-none"
        />
      </div>
    </div>
  );
};

export default SearchBar;
