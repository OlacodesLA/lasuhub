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
                <div className="w-full h-full  cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-red-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
              </div>
              <div className="w-full h-full flex cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-purple-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" />
              </svg>
                {post?.comments &&
                <div className="flex gap-1">
                    <p className="tetxbase">{post?.comments?.length}</p>  <p className="text-base">{post?.comments?.length == 1 ? "Comment": "Comments"}</p> 
                </div>
                }
                </div>
                </div>
            <div className="flex -space-x-4">
                {post?.comments?.slice(0,3).map((comment)=>{
                    return(
                        <div key={comment?.postedBy?._id} className="w-7 h-7 relative">
                        <Image fill className="w-7 h-7 border-2 border-white rounded-full dark:border-white" src={comment?.postedBy?.image} alt=""/>
                        </div>
                        )
                })}
                {post?.comments?.length > 3 &&  
                <Link href="#" className="flex items-center justify-center z-10 w-7 h-7 text-xs font-medium text-white bg-gray-700 border-2 border-white rounded-full hover:bg-gray-600 dark:border-gray-800">
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
