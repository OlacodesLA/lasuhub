//@ts-nocheck
import React from "react";
import {FaCaretDown} from "react-icons/fa"
import Chevron from "@/helpers/Chevron";
import Link from "next/link";
import Sponsored from "./Sponsored";
import Image from 'next/image';

const Right = ({user}:any) => {
  return (
    <div className="flex justify-end">
    <div className="fixed w-[25%] h-full  px-6 pt-2">
      <div className="flex items-center justify-end gap-2">
        <div className="flex justify-end gap-3 items-center">
        <img
          src={user?.image}
          className="rounded-full w-8 h-8 object-cover"
          alt=""
          srcSet=""
        />
        <p className="text-sm font-bold">{user?.name}</p>
      </div>
      <div className="w-8">
        <Chevron/>
      </div>
      </div>
      <div className="w-full h-full mt-10">
        <div className="w-full bg-white rounded-xl">
            <div className="w-full h-full relative">
              <div className="item">
              <div className="img-wrap w-full h-[100px] ">
                {user?.cover ? (
                  <img src={user?.cover} className="w-full h-[100px] object-cover object-center rounded-t-lg"  alt="" srcset="" />
                ):(
                  <div className="w-full h-full bg-gradient-to-r p-[2px] from-[#6EE7B7] via-[#3B82F6] to-[#9333EA]"></div>
                )
                }
              
              </div>
              </div>
              <div className="w-full flex justify-center">
                <div className="flex justify-center items-center flex-col -translate-y-[40px] ">
                  <div className="rounded-full bg-gradient-to-r p-[2px] from-[#6EE7B7] via-[#3B82F6] to-[#9333EA]">
                  <div className="bg-white rounded-full">
                    <Link href={`/app/profile/${user?._id}`}>
                <img src={user?.image}   className=" object-cover w-[70px] h-[70px] rounded-full p-[2px]" alt="" srcset="" />
                </Link>
                </div>
                </div>
                <p className="font-inter  font-bold">{user?.name}</p>
                <p className="text-sm text-gray-600">{user?.matric}</p>
                <p className="text-sm text-gray-600">{user?.faculty}</p>
                </div>
              </div>

            </div>

        </div>

        <div className=" w-full h-[300px] mt-10 bg-white rounded-xl">
          <Sponsored/>
      </div>
      </div>


    </div>
    </div>
  );
};

export default Right;
