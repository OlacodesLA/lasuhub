//@ts-nocheck
import React from "react";
import {useState, useEffect} from "react"
import { client } from "@/lib/sanity";
import { feedQuery } from "@/utils/data";
import Link from "next/link"
import { data } from "emoji-mart";
import Picker from '@emoji-mart/react'
import Create from "./Create";



const Upload = ({user, setPosts}:any) => {

    const [input, setInput] = useState("");
    const [showEmojis, setShowEmojis] = useState(false);
    const [create, setCreate] = useState(false)

   const  uploads=[
        {
        name : "Image",
        svg: <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-blue-600">
        <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
      </svg>
         
        },
{
    name:"Video",
    svg: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-green-600">
    <path d="M12 9a3.75 3.75 0 100 7.5A3.75 3.75 0 0012 9z" />
    <path fillRule="evenodd" d="M9.344 3.071a49.52 49.52 0 015.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.24.383.645.643 1.11.71.386.054.77.113 1.152.177 1.432.239 2.429 1.493 2.429 2.909V18a3 3 0 01-3 3h-15a3 3 0 01-3-3V9.574c0-1.416.997-2.67 2.429-2.909.382-.064.766-.123 1.151-.178a1.56 1.56 0 001.11-.71l.822-1.315a2.942 2.942 0 012.332-1.39zM6.75 12.75a5.25 5.25 0 1110.5 0 5.25 5.25 0 01-10.5 0zm12-1.5a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
  </svg>
},
{
    name:"Attachment",
    svg: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-orange-600">
    <path fillRule="evenodd" d="M18.97 3.659a2.25 2.25 0 00-3.182 0l-10.94 10.94a3.75 3.75 0 105.304 5.303l7.693-7.693a.75.75 0 011.06 1.06l-7.693 7.693a5.25 5.25 0 11-7.424-7.424l10.939-10.94a3.75 3.75 0 115.303 5.304L9.097 18.835l-.008.008-.007.007-.002.002-.003.002A2.25 2.25 0 015.91 15.66l7.81-7.81a.75.75 0 011.061 1.06l-7.81 7.81a.75.75 0 001.054 1.068L18.97 6.84a2.25 2.25 0 000-3.182z" clipRule="evenodd" />
  </svg>
  
},
{
    name:"Hashtag",
    svg: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-red-600">
    <path fillRule="evenodd" d="M11.097 1.515a.75.75 0 01.589.882L10.666 7.5h4.47l1.079-5.397a.75.75 0 111.47.294L16.665 7.5h3.585a.75.75 0 010 1.5h-3.885l-1.2 6h3.585a.75.75 0 010 1.5h-3.885l-1.08 5.397a.75.75 0 11-1.47-.294l1.02-5.103h-4.47l-1.08 5.397a.75.75 0 01-1.47-.294l1.02-5.103H3.75a.75.75 0 110-1.5h3.885l1.2-6H5.25a.75.75 0 010-1.5h3.885l1.08-5.397a.75.75 0 01.882-.588zM10.365 9l-1.2 6h4.47l1.2-6h-4.47z" clipRule="evenodd" />
  </svg>
  
  
},
{
    name:"Mentions",
    svg: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-gray-600">
    <path fillRule="evenodd" d="M17.834 6.166a8.25 8.25 0 100 11.668.75.75 0 011.06 1.06c-3.807 3.808-9.98 3.808-13.788 0-3.808-3.807-3.808-9.98 0-13.788 3.807-3.808 9.98-3.808 13.788 0A9.722 9.722 0 0121.75 12c0 .975-.296 1.887-.809 2.571-.514.685-1.28 1.179-2.191 1.179-.904 0-1.666-.487-2.18-1.164a5.25 5.25 0 11-.82-6.26V8.25a.75.75 0 011.5 0V12c0 .682.208 1.27.509 1.671.3.401.659.579.991.579.332 0 .69-.178.991-.579.3-.4.509-.99.509-1.671a8.222 8.222 0 00-2.416-5.834zM15.75 12a3.75 3.75 0 10-7.5 0 3.75 3.75 0 007.5 0z" clipRule="evenodd" />
  </svg>
},
]

const addEmoji = (e) => {
    let sym = e.unified.split("-");
    let codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);
    setInput(input + emoji);
  };


  return <div>
    <div className="bg-white rounded-lg w-full h-full">
        <div className="w-full">
        <div className="flex flex-col justify-between items-center p-4">
        <div className="flex items-center gap-4 w-full ">
              <img src={user?.image} className="w-12 h-12 rounded-full" alt="" srcset="" />
              <div className="relative w-full">
              <input type="text"  value={input} onChange={(e) => setInput(e.target.value)} onClick={()=> setCreate(true)} name="search" placeholder="Share something..." className="w-full h-10 text-sm bg-gray-100 focus:ring-blue-500 focus:border-blue-500  rounded-[70px] pl-5"  />
              <button className="absolute right-2 top-[9px]" onClick={() => setShowEmojis(!showEmojis)}>
                <img src="/images/happy.png" className="w-5" alt="" srcset="" />
              </button>
              {showEmojis && (
        <div className="absolute top-30 right-2 z-50">
          <Picker data={data} onEmojiSelect={addEmoji} />
        </div>
      )}
      </div>

      {
        create && <div className="fixed">
            <Create isOpen={create} user={user} setPosts={setPosts} setInput={setInput} input={input} setIsOpen={setCreate}/>
        </div>
      }


        </div>
        <div className="h-[1px] rounded-xl my-5 w-full bg-gray-300"></div>
        <div className="flex gap-4 justify-start items-center w-full">
    {uploads.map((upload)=>{
        return(
            <div key={upload.name} className="flex gap-2 justify-between items-center">
                <div className="flex items-center gap-1">
                {upload.svg}
                <p>{upload.name}</p>
                </div>
            </div>
        )
    })}
        </div>
        </div>
        </div>

    </div>
  </div>;
};

export default Upload;