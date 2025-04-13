import React from "react";
// import {MagnifyingGlassIcon} from '@heroicons/react/24/solid'

const Search = () => {
  return (
    <div className="flex justify-center">
      <div className="border w-[14rem] px-1 py-1 text-sm flex gap-4">
        {/* <MagnifyingGlassIcon className='w-5 h-5'/> */}
        <input type="text" placeholder="Search" className="outline-none" />
      </div>
    </div>
  );
};

export default Search;
