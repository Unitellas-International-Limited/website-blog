"use client";
import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <section className="flex justify-center">
      <div className="w-full max-w-[80%] rounded-xl p-3 text-sm flex gap-4 my-4 shadow-sm hover:shadow-[#3caaee]">
        <Search size={20} />
        <input
          type="text"
          placeholder="Search using title..."
          className="w-full outline-none"
          value={value}
          onChange={onChange}
        />
      </div>
    </section>
  );
};

export default SearchBar;
