//@ts-nocheck
import React from "react";
import { Menu, Transition } from '@headlessui/react'
import { Fragment, useEffect, useRef, useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import {IoEllipsisVerticalSharp} from "react-icons/io5"
import { useRouter } from "next/router";
import Navigation from "@/components/Navigation";
import { urlFor } from "@/lib/sanity";
import Loader from '@/components/Loader'
import {client} from '@/lib/sanity'
import More from "@/helpers/More";
import { v4 as uuidv4 } from "uuid";
import {MdBookmarkAdd, MdBookmarkRemove, MdOutlineBookmarkAdd, MdOutlineBookmarkRemove} from "react-icons/md"

export default function Example({posts, post}:any) {
    const [savingPost, setSavingPost] = useState(false);
    const router = useRouter()
  

    if (typeof window !== 'undefined') {
      // Perform localStorage action
      const user = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();
      const myid = user?.email?.replace("@", "")

    let alreadySaved = post?.save?.filter((item) => item?.postedBy?._id === myid);
    
    alreadySaved = alreadySaved?.length > 0 ? alreadySaved : [];

    const deletePin = (id, key) => {
        client
          .patch(id)
          .unset([`save[_key==${key}]`])
          .commit()
          .then(() => {
            window.location.reload();
          });
      };
    
  
    const savePin = (id) => {
      if (alreadySaved?.length === 0) {
        setSavingPost(true);
        client
          .patch(id)
          .setIfMissing({ save: [] })
          .insert('after', 'save[-1]', [{
            _key: uuidv4(),
            userId: myid,
            postedBy: {
              _type: 'postedBy',
              _ref: myid,
            },
          }])
          .commit()
          .then(() => {
            window.location.reload();
            setSavingPost(false);
          });
      }
      
    };
  
  return (
    <div className="text-right">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full h-full justify-center text-black ">
            <IoEllipsisVerticalSharp className='text-[40px] w-[40px] h-[40px]'/>
          </Menu.Button>
        </div>
        
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <div
                  >
                    {console.log("OKAY", post)}
                                {alreadySaved?.length !== 0 ? (
                                    <button type="button"   
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        deletePin(post?._id, post?.save?._key);
                                      }}  className={`${
                                        active ? 'bg-violet-500 text-purple-600' : 'text-gray-900'
                                    } group flex  gap-2 w-full items-center rounded-md px-2 py-2 text-sm`}>
                                {active ? (
                                    <EditActiveIcon
                                        className="mr-4 h-5 w-5"
                                        aria-hidden="true"
                                    />
                                    ) : (
                                    <EditInactiveIcon
                                        className="mr-4 h-5 w-5"
                                        aria-hidden="true"
                                    />
                                    )}
                                    Unsave
                                    </button>
                                ) : (
                                    <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        savePin(post?._id);
                                    }}
                                    type="button"
                                    className={`${
                                        active ? 'bg-violet-500 text-purple-600' : 'text-gray-900'
                                    } group flex  gap-2 w-full items-center rounded-md px-2 py-2 text-sm`}
                                    >
                                    {active ? (
                                        <EditActiveIcon
                                            className="mr-4 h-5 w-5"
                                            aria-hidden="true"
                                        />
                                        ) : (
                                        <EditInactiveIcon
                                            className="mr-4 h-5 w-5"
                                            aria-hidden="true"
                                        />
                                        )}
                                      {savingPost ? 'Saving' : 'Save'}
                                    </button>
                                )}
                  </div>
                )}
              </Menu.Item>
              </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}
}

function EditInactiveIcon(props) {
  return (
    <MdOutlineBookmarkAdd/>
    
  )
}





function EditActiveIcon(props) {
  return (
    <MdBookmarkAdd/>

  )
}

