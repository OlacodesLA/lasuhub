//@ts-nocheck
import { useState } from 'react'
import { Tab } from '@headlessui/react'
import Link from 'next/link'
import More from "@/helpers/More";
import Image from 'next/image';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Tabs({userPosts, userSaves}:any) {
  let [categories] = useState({
    Posts : [userPosts],
    Saves : [userSaves],
  })

  return (
    <div className="w-full mt-10">
      <Tab.Group>
        {console.log(userPosts)}
        <Tab.List className="flex space-x-1 rounded-xl bg-purple-900/20 p-1">
            <Tab
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-purple-700',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-purple-400 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-white shadow'
                    : 'text-purple-100 hover:bg-white/[0.12] hover:text-white'
                )
              }
            >
              About
            </Tab>
            <Tab
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-purple-700',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-purple-400 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-white shadow'
                    : 'text-purple-100 hover:bg-white/[0.12] hover:text-white'
                )
              }
            >
              Posts
            </Tab>
            <Tab
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-purple-700',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-purple-400 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-white shadow'
                    : 'text-purple-100 hover:bg-white/[0.12] hover:text-white'
                )
              }
            >
              Saves
            </Tab>

        </Tab.List>
        <Tab.Panels className="mt-2">
            <Tab.Panel
              className={classNames(
                'rounded-xl ',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-purple-400 focus:outline-none focus:ring-2'
              )}
            >
          <div className="w-full bg-white rounded-xl">
            <div className="w-full h-full bg-white">
              
            </div>
          </div>
            </Tab.Panel>
            <Tab.Panel
              className={classNames(
                'rounded-xl ',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-purple-400 focus:outline-none focus:ring-2'
              )}
            >
              <ul>
                {userPosts?.map((post) => (
                            <div key={post?._id} className=" my-5 relative w-full h-full gap-2 bg-white shadow-sm shadow-purple-600/20 rounded-xl flex px-1">
                            <div className="flex flex-col w-full p-3">
                              <div className="flex w-full justify-between items-center">
                            <Link href={`/app/profile/${post?.postedBy?._id}`} className="flex gap-2 ">
                              <div className=" relative w-9 h-9 rounded-full">
                              <Image src={post?.postedBy?.image} className="w-9 h-9 rounded-full" alt="" srcset="" />
                              </div>
                              <div className="flex flex-col">
                                  <p className="text-[14px] font-bold font-inter">{post?.postedBy?.name}</p>
                                  <p className="text-[12px]">{post?.postedBy?.matric}</p>
                              </div>
                            </Link>
                            <div className="">
                                  <More posts={userPosts} post={post} />
                            </div>
                            </div>
                            <Link href={`/app/post/${post?._id}`} className="">
                            <p className="mt-1 w-full">
                               {post?.about}
                            </p>
                            {post?.image?.asset?.url &&  
            <div className="relative w-full h-[300px] rounded-md">
            <Image src={post?.image?.asset?.url} fill className="w-full h-[300px] object-cover object-center rounded-md " alt="" srcset="" />
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
                                    <p className="tetxbase">{post?.comments?.length}</p>  <p className="text-base">Comment</p> 
                                </div>
                                }
                                </div>
                                </div>
                            <div className="flex -space-x-4">
                                {post?.comments?.slice(0,3).map((comment)=>{
                                    return(
                                      <div key={comment?.postedBy?._id} className="relative w-7 h-7">
                                        <Image  fill className="w-7 h-7 border-2 border-white rounded-full dark:border-white" src={comment?.postedBy?.image} alt=""/>
                                        </div>
                                    )
                                })}
                                
                                {post?.comments?.length > 3 &&  
                                <Link href="#" className="flex items-center justify-center w-7 h-7 text-xs font-medium text-white bg-gray-700 border-2 border-white rounded-full hover:bg-gray-600 dark:border-gray-800">
                                   + {post?.comments?.length - 3}
                                    </Link>
                                    }
                            </div>
                            </div>
                
                            </div>
                          </div>
                ))}
              </ul>
            </Tab.Panel>
            <Tab.Panel
              className={classNames(
                'rounded-xl ',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-purple-400 focus:outline-none focus:ring-2'
              )}
            >
              <ul>
                {userSaves?.map((post) => (
                            <div key={post?._id} className=" relative w-full h-full gap-2 bg-white shadow-sm shadow-purple-600/20 rounded-xl flex px-1">
                            <div className="flex flex-col w-full p-3">
                              <div className="flex w-full justify-between items-center">
                            <Link href={`/app/profile/${post?.postedBy?._id}`} className="flex gap-2 ">
                              <div className="relative w-9 h-9 rounded-full ">
                              <Image src={post?.postedBy?.image} fill className="w-9 h-9 rounded-full" alt="" srcset="" />
                              </div>
                              <div className="flex flex-col">
                                  <p className="text-[14px] font-bold font-inter">{post?.postedBy?.name}</p>
                                  <p className="text-[12px]">{post?.postedBy?.matric}</p>
                              </div>
                            </Link>
                            <div className="">
                                  <More posts={userPosts} post={post} />
                            </div>
                            </div>
                            <Link href={`/app/post/${post?._id}`} className="">
                            <p className="mt-1 w-full">
                               {post?.about}
                            </p>
                            {post?.image?.asset?.url &&  
             <div className="relative w-full h-[300px] rounded-md">
             <Image src={post?.image?.asset?.url} fill className="w-full h-[300px] object-cover object-center rounded-md " alt="" srcset="" />
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
                                    <p className="tetxbase">{post?.comments?.length}</p>  <p className="text-base">Comment</p> 
                                </div>
                                }
                                </div>
                                </div>
                            <div className="flex -space-x-4">
                                {post?.comments?.slice(0,3).map((comment)=>{
                                    return(
                                      <div  key={comment?.postedBy?._id} className="w-7 h-7 relative">
                                        <Image className="w-7 h-7 border-2 border-white rounded-full dark:border-white" src={comment?.postedBy?.image} alt=""/>
                                        </div>
                                        )
                                })}
                                {post?.comments?.length > 3 &&  
                                <Link href="#" className="flex items-center justify-center w-7 h-7 text-xs font-medium text-white bg-gray-700 border-2 border-white rounded-full hover:bg-gray-600 dark:border-gray-800">
                                   + {post?.comments?.length - 3}
                                    </Link>
                                    }
                            </div>
                            </div>
                
                            </div>
                          </div>
                ))}
              </ul>
            </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}
