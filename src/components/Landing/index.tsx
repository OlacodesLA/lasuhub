//@ts-nocheck
import React from "react";
import { HamburgerIcon, FuelerIcon, StarIcon } from "@/helpers/svgs";
import Link from "next/link";
import Image from 'next/image';
import { menus } from "./data";
import Navbar from "./Navbar";

const Landing = ({user}) => {



  return <div>
    <div>
  <div
    className="w-full min-h-screen font-sans text-gray-900 "
  >
    <Navbar user={user}/>
    <div
      className="flex flex-wrap-reverse gap-y-24 justify-between py-12 px-6 mx-auto max-w-screen-2xl sm:px-8 md:px-12 lg:px-16 xl:px-24"
    >
      <div className="relative z-10 md:w-1/2 w-full">
        <img
          className="absolute top-0 right-0 md:-top-4 md:-right-8 w-24 h-auto"
          src="/img/leaf.png"
          alt=""
        />
        {/* <span className="flex items-center px-1 text-xl text-purple-600">
          <span className="font-medium">100% Organic food</span>
          <img className="w-auto h-8" src="/img/vegetable.png" alt="" />
        </span> */}
        <h1
          className="pt-4 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter leading-tight whitespace-nowrap"
        >
          Join <span className="whitespace-nowrap text-purple-600">Lagos <br />
          State University</span> <br />
           Learning Revolution
        </h1>
        <p className="pt-8 sm:text-lg max-w-md font-normal text-gray-600 leading-relaxed">
        Our platform connects you with experts, peers, and mentors from lagos state university, making learning accessible, engaging, and fun.
        </p>
        <div className="flex pt-8 space-x-4 sm:space-x-6">
          <button
            className="flex justify-center items-center w-full sm:w-auto h-12 px-8 bg-purple-600 font-medium text-white rounded-xl whitespace-nowrap hover:shadow-primary transition-shadow duration-300"
          >
            Get started
          </button>
          <button
            className="flex justify-center items-center w-full sm:w-auto h-12 px-8 font-medium text-gray-900 border border-gray-900 rounded-xl whitespace-nowrap hover:shadow-xl transition-shadow duration-300"
          >
            Explore menu
          </button>
        </div>
        {/* <div className="flex pt-20">
          <img className="w-24" src="/img/chef.png" alt="" />
          <div className="pt-5 pl-3">
            <div className="text-xl font-bold leading-relaxed">Chef of the month</div>
            <div className="inline-flex text-gray-600 leading-relaxed">
              People loved his 🍳
            </div>
            <div className="font-bold text-purple-600 leading-relaxed">80+ famous dishes</div>
          </div>
        </div> */}
        <div>
          <div className="flex md:hidden pt-8 justify-end space-x-1 font-bold">
            <span>Powered by</span>
            <FuelerIcon style="w-6 h-6 text-gray-900 fill-current" />
            <span>Fueler</span>
          </div>
        </div>
      </div>

      <div className="relative md:w-1/2 w-full flex flex-col justify-between">
        <img
          className="w-96 lg:w-full drop-shadow-2xl self-center lg:self-end"
          src="/images/result.png"
          alt=""
        />
        <div
          className="absolute right-0 lg:-right-6 top-0 lg:-top-10 flex flex-col py-5 px-7 rounded-2xl shadow-xl bg-white/80 backdrop-blur-xl hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
        >
          {/* <div className="flex -space-x-3">
            <div
              v-for="i in 3"
              className="w-13 h-12 rounded-full border-4 border-white object-cover overflow-hidden"
            >
              <img src="" alt="" />
            </div>
          </div> */}
          <div className="pt-3 font-bold">Easy Access</div>
          <div className="flex items-center text-gray-600 leading-relaxed">
            <StarIcon style="w-5 h-5"  />
            <span className="pl-1">4.9 (+2.5k Ratings)</span>
          </div>
        </div>
        <div
          className="absolute left-0 lg:-left-6 top-0 lg:top-[20rem] flex flex-row py-2 px-3 rounded-2xl shadow-xl bg-white/80 backdrop-blur-xl hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
        >
          <img className="w-auto h-20 self-end" src="/img/driver.png" alt="" />
          <div className="pr-7 pl-2 py-5">
            <div className="font-bold">Post Questions</div>
            <div className="text-gray-600 leading-relaxed">Swift Answers 🚀</div>
          </div>
        </div>
        {/* <div className="hidden md:flex justify-end space-x-1 font-bold">
          <span>Powered by</span>
          <FuelerIcon className="w-6 h-6 text-gray-900 fill-current" />
          <span>Fueler</span>
        </div> */}
      </div>
    </div>
  </div>
</div>
  </div>;
};

export default Landing;
