//@ts-nocheck
import React from "react";
import {useState, useEffect} from "react"
import { useRouter } from "next/router";
import Navigation from "@/components/Navigation";
import { urlFor } from "@/lib/sanity";
import Loader from '@/components/Loader'
import {client} from '@/lib/sanity'
import { feedQuery } from "@/utils/data";
import More from "@/helpers/More";
import { v4 as uuidv4 } from "uuid";
import Upload from "./Upload";
import Link from "next/link";
import {AiFillCaretRight} from "react-icons/ai"
import Image from 'next/image';

const Middle = ({posts, setPosts, user}:any) => {
  const [savingPost, setSavingPost] = useState(false);
  const router = useRouter()






  return <div className="flex justify-center "> 
    <div className=" w-[55%] h-full ">
    {console.log(posts)}
    <div className="flex justify-center w-full">
        <Navigation user={user}/>
    </div>

    <div className="mt-20 px-20">
      <Upload user={user} setPosts={setPosts}/>
    </div>
    {router.pathname === "/app/saved" && <div className="mt-20 px-20">
      <h1 className="weight font-dm text-lg">Saved Posts</h1>
    </div> }
    {
      posts?.map((post)=>{
        return(
          <div key={post?._id} className="flex justify-center w-full mt-10 px-20">

          <div className=" relative w-full h-full gap-2 bg-white shadow-sm shadow-purple-600/20 rounded-xl flex px-1">
            <div className="flex flex-col w-full p-3">
              <div className="flex w-full justify-between items-center">
            <Link href={`/app/profile/${post?.postedBy?._id}`} className="flex gap-2 ">
              <div className="relative w-9 h-9 ">
              <Image src={post?.postedBy?.image} fill className="w-9 h-9 object-cover rounded-full" alt="" srcset="" />
              </div>
              <div className="flex flex-col">
                <div className="flex gap-1 items-center">
                  <p className="text-[14px] font-bold font-inter">{post?.postedBy?.name}</p>
                  {post?.postedBy?.level && 
                      <AiFillCaretRight className="text-purple-600"/>
                  }

                  <p className="font-inter text-[14px] font-bold">{post?.postedBy?.level}</p>
                  </div>
                  <p className="text-[12px]">{post?.postedBy?.matric}</p>
              </div>
            </Link>
            <div className="">
                  <More posts={posts} post={post} />
            </div>
            </div>
            <Link href={`/app/post/${post?._id}`} className="">
            <p className="mt-1 w-full">
               {post?.about}
            </p>
            {post?.image?.asset?.url &&  
            <div className="mt-1 w-full">
              <div className="relative w-full h-[300px] rounded-md">
              <Image src={post?.image?.asset?.url} fill className="w-full h-[300px] object-cover object-center rounded-md " alt="" srcset="" />
              </div>
            </div>
            }
            </Link>
            <div className="flex justify-between w-full items-center">
                <div className="flex gap-10 pt-2 items-center">
                <div className="w-full h-full cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-red-600 ">
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                </svg>
                </div>

                <div className="w-full h-full flex cursor-pointer">
                <svg  viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-purple-600 ">
                <path fillRule="evenodd" d="M5.337 21.718a6.707 6.707 0 01-.533-.074.75.75 0 01-.44-1.223 3.73 3.73 0 00.814-1.686c.023-.115-.022-.317-.254-.543C3.274 16.587 2.25 14.41 2.25 12c0-5.03 4.428-9 9.75-9s9.75 3.97 9.75 9c0 5.03-4.428 9-9.75 9-.833 0-1.643-.097-2.417-.279a6.721 6.721 0 01-4.246.997z" clipRule="evenodd" />
                </svg>
                {post?.comments &&
                <div className="flex gap-1">
                    <p className="text-base">{post?.comments?.length}</p>  <p className="text-base">Comment</p> 
                </div>
                }
                </div>
                </div>
            <div className="flex -space-x-4">
                {post?.comments?.slice(0,3).map((comment)=>{
                    return(
                        <div key={comment?.postedBy?._id} className="w-7 h-7 relative">
                        <Image fill className="w-7 h-7 object-cover border-2 border-white rounded-full dark:border-white" src={comment?.postedBy?.image} alt=""/>
                        </div>
                        )
                })}
                {post?.comments?.length > 3 &&  
                <Link href="#" className="flex items-center justify-center w-7 h-7 text-xs font-medium text-white bg-gray-700 border-2 border-white rounded-full hover:bg-gray-600 dark:border-gray-800" href="#">
                   + {post?.comments?.length - 3}
                    </Link>
                    }
            </div>
            </div>

            </div>
          </div>
        </div>
       
        )
      })
    }
 </div>
  </div>;
};

export default Middle;
