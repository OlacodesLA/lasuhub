//@ts-nocheck
import React from "react";
import Link from "next/link";
import { HamburgerIcon, FuelerIcon, StarIcon } from "@/helpers/svgs";
import { menus } from "./data";

const Navbar = ({user}:any) => {
  return     <nav
  className="flex justify-between items-center py-8 px-6 mx-auto max-w-screen-2xl md:px-12 lg:px-16 xl:px-24"
>
  <Link href="/" className="text-3xl md:text-4xl font-bold tracking-wide">
    Lasu<span className="text-purple-600">Hub</span>
  </Link>
  <div
    className="inset-0 transition-all  z-20 md:static md:bg-transparent md:flex items-center justify-center space-y-8 md:space-y-0 md:space-x-8 flex-col md:flex-row lg:space-x-14"

  >
    <ul
      className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-10 lg:md:-x-8"
    >

      {menus.map((menu, index)=>{
        return(
      <li key={index}
        className="text-lg md:text-base lg:text-lg font-medium group"
      >
        <a href="#"> {menu.name} </a>
        <div
          className="h-0.5 scale-x-0 group-hover:scale-100 transition-transform origin-left rounded-full duration-300 ease-out"
        />
      </li> )
      })}
    </ul>
    { user ? 
        <Link href="/app" className="flex items-center ">
            <p className="font-bold">{user?.name}</p>
            <img src={user?.image} className="w-9 h-9 rounded-full" alt="" srcset="" />
        </Link> :
        <Link href="/auth/signin">
            <button
              className="flex justify-center items-center h-12 px-7 font-medium text-white bg-purple-600 rounded-xl hover:shadow-primary transition-shadow duration-300 whitespace-nowrap"
            >
              Login
            </button>
        </Link>
    }


  </div>
  <button className="block md:hidden relative z-30">
    <HamburgerIcon style="w-8 h-8 fill-current text-gray-900" />
  </button>
</nav>;
};

export default Navbar;
