//@ts-nocheck
import React, { useState, useEffect } from "react";
import { client } from "@/lib/sanity";
import { pq } from "@/utils/data";




// const files = [
//     {
//       title: 'IMG_4985.HEIC',
//       size: '3.9 MB',
//       source:
//         'https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80',
//     },
//     // More files...
//   ]

const Products = () => {
  const [showModal, setShowModal] = useState(false);
  const [activeObject, setActiveObject] = useState(null);
  const [files, setFiles] = useState([]);
  

  useEffect(() => {
    client.fetch(pq).then((data)=>{
        setFiles(data)
        console.log(data)
    })
  }, []);
  



  function getClass(index) {
    return index === activeObject?._id ? "active" : "inactive";
    
  }

  // here className can not be "inactive" since Modal always shows activeObject
  const Modal = ({ object: { image } }) => (
    <div className="relative z-10">
    <div className="fixed active inset-0 bg-black bg-opacity-25" >
    <div className="fixed inset-0 overflow-y-auto">
    <div className="flex min-h-full items-center justify-center p-4 text-center">
    <div className="  w-full reltive max-w-3xl h-full  transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
    <div className="absolute right-3 top-3">
        <div onClick={() => setShowModal(false)} className="cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clipRule="evenodd" />
        </svg>
        </div>
    </div>
    <img src={image?.asset?.url}  className="w-full h-full object-cover rounded-xl" alt="" srcset="" />
    </div>
    </div>
    </div>
    </div>
    </div>
  );



  return (
    <>
        <ul role="list" className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
        {files.map(({course, department, level, session, image, _id}) => (
        <li key={_id}             
        onClick={() => {
            setActiveObject({  course, department, level, session, image, _id });
            setShowModal(true);
        }} className={`relative ${getClass(_id)}`}>
            <div className="group aspect-w-10 aspect-h-7 block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
            <img src={image?.asset?.url} alt="" className="pointer-events-none object-cover group-hover:opacity-75" />
            <button type="button" className="absolute inset-0 focus:outline-none">
                <span className="sr-only">View details for {course}</span>
            </button>
            </div>
            <p className="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900">{session}</p>
            <p className="pointer-events-none block text-sm font-medium text-gray-500"><span className="text-gray-900">{department}</span> {level}level</p>
        </li>
        ))}
        </ul>
      {showModal ? <Modal object={activeObject} /> : null}
    </>
  );
};

export default Products;


