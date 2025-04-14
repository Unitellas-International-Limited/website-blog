import React from "react";
// import {MagnifyingGlassIcon} from '@heroicons/react/24/solid'

const Search = () => {
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-[70%] rounded-xl p-3 text-sm flex gap-4 my-4 shadow-sm">
        {/* <MagnifyingGlassIcon className='w-5 h-5'/> */}
        <input
          type="text"
          placeholder="Search"
          className="w-full outline-none"
        />
      </div>
    </div>
  );
};

export default Search;
