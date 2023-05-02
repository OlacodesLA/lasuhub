//@ts-nocheck
import React from "react";
import Navigation from "@/components/Navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { userQuery } from "@/utils/data";
import { client } from "@/lib/sanity";
import { userCreatedPostsQuery, userSavedPostsQuery } from "@/utils/data";
import Link from "next/link";
import Tabs from "./Tabs";
import Image from 'next/image';


const ProfilePage = ({userId, authUser}:any) => {
    const [user, setUser] = useState();
    const [userPosts, setUserPosts] = useState(null);
    const [userSaves, setUserSaves] = useState(null);
    const [text, setText] = useState('Created');
    const [activeBtn, setActiveBtn] = useState('created');
    const [edit, setEdit] = useState(false)
    const router = useRouter()
  
  console.log(userId)

    useEffect(() => {
        const query = userQuery(userId);
        client.fetch(query).then((data) => {
          setUser(data[0]);
        });

      }, [userId]);
  

      useEffect(() => {
        const savedPinsQuery = userSavedPostsQuery(userId);
        client.fetch(savedPinsQuery).then((data) => {
          setUserSaves(data);
        })
      }, [userId]);
      

      useEffect(() => {
        const createdPostsQuery = userCreatedPostsQuery(userId);
        client.fetch(createdPostsQuery).then((data) => {
          setUserPosts(data);
          
        });
      }, [userId]);
    
    
      const logout = () => {
        localStorage.clear();
    
        router.push("/")
      };

  return <div className="flex justify-center w-full h-full "> 
  <div className=" w-[55%] h-full ">
  <div className="flex justify-center w-full">
      <Navigation user={user}/>
  </div>

  {console.log(userPosts)}
  <div className="w-full  mt-20 px-10 ">
<div className="bg-white w-full h-full rounded-xl pb-5">

              {user && 
              <div className="w-full">
              <div className="img-wrap w-full h-[100px] ">
                {user?.cover ?
                (
                  <div className="relative w-full  h-[170px] object-cover object-center">
                  <Image src={user?.cover} fill className="w-full h-[170px] object-cover object-center rounded-t-xl"  alt="" srcset="" />
                  </div>
                ):(
                  <div className="w-full rounded-t-xl h-[170px] bg-gradient-to-r p-[2px] from-[#6EE7B7] via-[#3B82F6] to-[#9333EA]"></div>
                )}
                </div>
                <div className="flex w-full relative justify-between items-center">
                <div className="w-full flex justify-between">
                <div className="flex justify-between w-full items-start flex-col translate-y-[5px] pl-5 ">
                  <div className="rounded-full ">
                  <div className="bg-white rounded-full">
                    <Link href={`/app/profile/${user?._id}`}>
                      <div className="relative w-[120px] h-[120px] rounded-full">
                <Image src={user?.image}  fill className=" object-cover w-[120px] h-[120px] rounded-full p-[4px]" alt="" srcset="" />
                </div>
                </Link>
                </div>
                </div>
                {!edit && <div className="">
                <p className="font-dm font-bold ">{user?.name}</p>
                <p className="text-sm text-gray-600">{user?.matric}</p>
                <p className="text-sm text-gray-600">{user?.faculty}</p>
                </div>
                }
                {edit && <div className="w-full">
                  <div className="w-full">
                  <p className="font-dm font-bold text-2xl">Edit Profile</p>
                  <p className="text-base font-inter text-gray-600">Update your photo and personal details</p>
                </div> 
                <div className="pt-10 flex  gap-10 flex-col max-w-lg">
                {/* <div className="flex justify-between items-center max-w-xl">
                  <div  className="block text-base font-medium leading-6 text-gray-900"></div>
                  <div className="">
                    <div className="flex rounded-md shadow-sm ring-2 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-purple-600 ">
                      <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">lasu.com.ng/</span>
                      <input type="text" name="username" id="username" autocomplete="username" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 focus:ring-offset-0 focus:outline-none  sm:text-sm sm:leading-6" placeholder="janesmith"/>
                    </div>
                  </div>
                </div> */}
                <div className="flex justify-between items-center w-full">
                  <div className="block w-full text-base font-medium leading-6 text-gray-900">Full Name</div>
                    <input id="email" name="email" type="email" autocomplete="email" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"/>
                </div>
                <div className="flex justify-between items-center w-full">
                  <div className="block w-full text-base font-medium leading-6 text-gray-900">Matric</div>
                    <input id="email" name="email" type="email" autocomplete="email" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"/>
                </div>

                <div className="flex justify-between items-center w-full">
          <label for="photo" className="block w-full text-sm font-medium leading-6 text-gray-900">Photo</label>
          <div className="mt-2 flex items-center gap-x-3">
            <svg className="h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clip-rule="evenodd" />
            </svg>
            <div className="relative h-12 w-12 rounded-full">
              <div className="relative w-12 h-12">
            <Image src={user?.image} fill className="h-12 w-12 text-gray-300 rounded-full" alt="" srcset="" />
            </div>
            <button type="button" className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">Change</button>
            </div>
          </div>
        </div>

        <div className="col-span-full">
          <label for="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">Cover photo</label>
          <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
            <div className="text-center">
              <svg className="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clip-rule="evenodd" />
              </svg>
              <div className="mt-4 flex text-sm leading-6 text-gray-600">
                <label for="file-upload" className="relative cursor-pointer rounded-md bg-white font-semibold text-purple-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-purple-600 focus-within:ring-offset-2 hover:text-purple-500">
                  <span>Upload a file</span>
                  <input id="file-upload" name="file-upload" type="file" className="sr-only"/>
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
        </div>

                <div className="flex justify-between items-center w-full">
                  <div className="block w-full text-base font-medium leading-6 text-gray-900">Level</div>
                    <select id="country" name="country" autocomplete="country-name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-purple-600  sm:text-sm sm:leading-6">
                      <option>100 level</option>
                      <option>200 level</option>
                      <option>300 level</option>
                      <option>400 level</option>
                      <option>500 level</option>
                      <option>Aspirant</option>
                      <option>Alumni</option>
                    </select>
                </div>
                <div className="flex justify-between items-center w-full">
                  <div className="block w-full text-base font-medium leading-6 text-gray-900">Faculty</div>
                    <input id="email" name="email" type="email" autocomplete="email" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"/>
                </div>
                <div className="flex justify-between items-center w-full">
                  <div className="block w-full text-base font-medium leading-6 text-gray-900">Department</div>
                    <input id="email" name="email" type="email" autocomplete="email" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"/>
                </div>
                <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input id="comments" name="comments" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-600"/>
                    </div>
                    <div className="text-sm leading-6">
                      <label for="comments" className="font-medium text-gray-900 flex gap-1">I agree to the <p className="text-purple-600"> terms and conditions</p></label>
                    </div>
                </div>
                <div className=" flex items-center justify-end gap-x-6">
                  <button type="button" onClick={()=>setEdit(false)} className="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
                  <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Update</button>
                </div>
                </div>
                </div>
                
                }

                </div>
              </div>
              { user?._id == authUser?._id &&
                              <div className="absolute right-0 top-[80px] w-full flex justify-end">
                              <button onClick={()=> setEdit(!edit)} className="flex  px-2 py-1 font-bold items-center ">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-purple-600 ">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                              </svg>
                              <p className="">Edit Profile</p>
                              </button>
                              </div>
              }
              </div>
              </div>
}

</div>
<Tabs userPosts={userPosts} userSaves={userSaves}  />

  </div>

</div>
</div>
};

export default ProfilePage;
