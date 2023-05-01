import React from "react";
import Link from "next/link";
import { categories } from "@/utils/data";

const isNotActiveStyle =
  "flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize";
const isActiveStyle =
  "flex items-center px-5 gap-3 font-extrabold border-r-2 border-black  transition-all duration-200 ease-in-out capitalize";

const Categories = () => {
  return (
    <div>
      <div className="mx-10 px-5 py-5 mt-10 bg-white rounded-2xl">
        <p className="font-dm font-bold   text-gray-700 pb-3">FACULTIES</p>
        <div className="flex flex-col gap-2">
          {categories.slice(0, categories.length - 1).map((category) => (
            <Link
              href={`/category/${category.link}`}
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }
              key={category.id}
            >
              <div className="p-1 hover:bg-indigo-400 hover:text-white rounded-md">
                {category.name}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
