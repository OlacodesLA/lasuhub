//@ts-nocheck
import React from "react";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Comment from "./Comment";

const PostDetails = ({postDetail, user, setComment, comment, addingComment, addComment}:any) => {
  return <div>
    <div className="flex justify-center "> 
    <div className=" w-[55%] h-full ">
          <div className="flex justify-center w-full">
              <Navigation user={user}/>
          </div>
          <div  className="flex justify-center w-full mt-20 px-20">
          <div className=" flex-col relative w-full h-full gap-2 bg-white shadow-sm shadow-purple-600/20 rounded-xl flex px-1">
            <div className="flex flex-col w-full p-3">
              <div className="flex w-full justify-between items-center">
            <div className="flex gap-2 ">
              <img src={postDetail?.postedBy?.image} className="w-9 h-9 rounded-full" alt="" srcset="" />
              <div className="flex flex-col">
                  <p className="text-[14px] font-bold font-inter">{postDetail?.postedBy?.name}</p>
                  <p className="text-[12px]">{postDetail?.postedBy?.matric}</p>
              </div>
            </div>
            </div>
            <p className="mt-1 w-full">
               {postDetail?.about}
            </p>
            {postDetail?.image?.asset?.url &&  
            <div className="mt-1 w-full">
            <img src={postDetail?.image?.asset?.url} className="w-[900px] h-[300px] object-cover object-center rounded-md " alt="" srcset="" />
            </div>
            }
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
                {postDetail?.comments &&
                <div className="flex gap-1">
            <p className="tetxbase">{postDetail?.comments?.length}</p>  <p className="text-base">Comment</p> 
                </div>
                }
                </div>
                </div>
            <div className="flex -space-x-4">
                {postDetail?.comments?.slice(0,3).map((comment)=>{
                    return(
                        <img key={comment?.postedBy?._id} className="w-7 h-7 border-2 border-white rounded-full dark:border-white" src={comment?.postedBy?.image} alt=""/>
                    )
                })}
                {postDetail?.comments?.length > 3 &&  
                <Link href="#" className="flex items-center justify-center w-7 h-7 text-xs font-medium text-white bg-gray-700 border-2 border-white rounded-full hover:bg-gray-600 dark:border-gray-800" href="#">
                   + {postDetail?.comments?.length - 3}
                    </Link>
                    }
            </div>
            </div>
            <div className="flex flex-wrap mt-6 gap-3">
              <Link href={`/app/profile/${user?._id}`}>
                <img src={user?.image} className="w-10 h-10 rounded-full cursor-pointer" alt="user-profile" />
              </Link>
              <input
                className=" flex-1 border-gray-100 outline-none border-2 p-2 rounded-2xl focus:border-gray-300"
                type="text"
                placeholder="Add a comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <button
                type="button"
                className="bg-purple-600 text-white rounded-full px-6 py-2 font-semibold text-base outline-none"
                onClick={addComment}
              >
                {addingComment ? 'Commenting...' : 'Comment'}
              </button>
            </div>
            <h2 className="mt-5 text-lg">Comments</h2>
            <div className="max-h-370 overflow-y-auto">
              {/* {postDetail?.comments?.map((item) => (
                <div className="flex gap-2 mt-5 items-center bg-white rounded-lg" key={item.comment}>
                  <img
                    src={item.postedBy?.image}
                    className="w-10 h-10 rounded-full cursor-pointer"
                    alt="user-profile"
                  />
                  <div className="flex flex-col">
                    <p className="font-bold">{item.postedBy?.userName}</p>
                    <p>{item.comment}</p>
                  </div>
                </div>
              ))} */}
            </div>
            <div className="pt-5">
            <Comment postDetail={postDetail}/>
            </div>

            </div>
          </div>
        </div>
       
 </div>
  </div>
  </div>;
};

export default PostDetails;
