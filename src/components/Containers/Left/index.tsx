//@ts-nocheck
import React from "react";
import Categories from "./Categories";

const Left = ({user}) => {
  return (
  <div className=""><div className="fixed w-[25%] ">
    <div className="flex gap-4 justify-center items-center w-full pt-2 px-2">
    <a href="#" className="text-xl md:text-lg font-bold tracking-wide">
        Lasu<span className="text-purple-600">Hub</span>
      </a>
      <div className="relative">
        <input type="text" name="search" placeholder="Search" className="w-[170px] h-8 bg-gray-200 rounded-lg pl-8 text-sm text-gray-700" id="" />
        <div className="absolute left-2 top-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-600">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        </div>
      </div>
    </div>
    <Categories/>
  </div>
  </div>);
};

export default Left;
