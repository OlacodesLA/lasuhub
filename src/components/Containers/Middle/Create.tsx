//@ts-nocheck

import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { useRouter } from 'next/router';
import { feedQuery } from '@/utils/data';
import { data } from "emoji-mart";
import Picker from '@emoji-mart/react'
import {client} from '@/lib/sanity'
import Image from 'next/image';


export default function MyModal({isOpen, setIsOpen, setPosts, user, setInput, input}) {
    const [showEmojis, setShowEmojis] = useState(false);
    const [title, setTitle] = useState('');
    // const [about, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [destination, setDestination] = useState();
    const [fields, setFields] = useState();
    const [checkFile, setCheckFile] = useState(false);
    const [selectedFile, setSelectedFile] = useState();
    const [category, setCategory] = useState();
    const [imageAsset, setImageAsset] = useState();
    const [wrongImageType, setWrongImageType] = useState(false);

    const router = useRouter()

    const uploadImage = (e) => {
        setSelectedFile(e.target.files[0]);
        const selectedFile = e.target.files[0];
        setCheckFile(true)
        // uploading asset to sanity
        if (selectedFile.type === 'image/png' || selectedFile.type === 'image/svg' || selectedFile.type === 'image/jpeg' || selectedFile.type === 'image/gif' || selectedFile.type === 'image/tiff') {
          setWrongImageType(false);
          setLoading(true);
          client.assets
            .upload('image', selectedFile, { contentType: selectedFile.type, filename: selectedFile.name })
            .then((document) => {
              setImageAsset(document);
            }).then(()=>{
              setLoading(false);
            })
            
            .catch((error) => {
              console.log('Upload failed:', error.message);
            });
        } else {
          setLoading(false);
          setWrongImageType(true);
        }
      };
    
      const uploadPost = () => {
        if ((input && imageAsset?._id)) {
          const doc = {
            _type: 'posts',
            about: input,
            image: {
              _type: 'image',
              asset: {
                _type: 'reference',
                _ref: imageAsset?._id,
              },
            },
            userId: user._id,
            postedBy: {
              _type: 'postedBy',
              _ref: user._id,
            },
          };
          client.fetch(feedQuery).then((data) => {
            setPosts(data);
            // setLoading(false);
          });
          client.create(doc).then(() => {
            setIsOpen(false)
          });

        } else if(input){
            const doc = {
                _type: 'posts',
                about: input,
                userId: user._id,
                postedBy: {
                  _type: 'postedBy',
                  _ref: user._id,
                },
              };

              client.fetch(feedQuery).then((data) => {
                setPosts(data);
                // setLoading(false);
              });

              client.create(doc).then(() => {
                setIsOpen(false)
              });
        } else{
          setFields(true);
    
          setTimeout(
            () => {
              setFields(false);
            },
            2000,
          );
        }
      };


  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  const addEmoji = (e) => {
    let sym = e.unified.split("-");
    let codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);
    setInput(input + emoji);
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center">
        <button
          type="button"
          onClick={openModal}
          className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          Open dialog
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-xl h-full transform overflow-hiddden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg text-center font-bold  leading-6 text-gray-900"
                  >
                    Create Post
                  </Dialog.Title>
                  <div className="flex gap-2 ">
                        <img src={user?.image} className="w-9 h-9 rounded-full" alt="" srcset="" />
                        <div className="flex flex-col">
                            <p className="text-[14px] font-bold font-inter">{user?.name}</p>
                            <p className="text-[12px]">{user?.matric}</p>
                        </div>
                    </div>
                    <div className="overflow-y-auto  w-full h-[400px] overflow-x-hidden">
                    {fields && (
        <p className="text-red-500 mb-5 text-xl transition-all duration-150 ease-in ">Please add all fields.</p>
      )}
                    <div className="mt-4">
                        <textarea type="text" name="search" value={input} onChange={(e) => setInput(e.target.value)} className='w-full h-[200px] text-sm md:text-lg px-2 py-1 border-white border-2' id="" />
                    </div>
                    <div className="flex w-full items-center justify-between">
                        <div className="">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clipRule="evenodd" />
                        </svg>
                        </div>
                        <div className="relative ">
                    <button className="" name='emoji'  type='' onClick={() => setShowEmojis(!showEmojis)}>
                      <div className="relative w-5 h-5">
                        <Image src="/images/happy.png" fill className="w-5 h-5" alt="" srcset="" />
                      </div>
              </button>
              <div className="z-50">
              {showEmojis && (
        <div className="absolute top-30 right-2 z-50">
          <Picker data={data} onEmojiSelect={addEmoji} />
        </div>
        
      )}
      </div>
      </div>
      </div>
                    {/* <div className="max-w-lg mt-4">
                        <label
                            className="flex justify-center w-full h-32 px-4 transition bg-white border-2  rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
                            <span className="flex items-center space-x-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                </svg>
                                <span className="font-medium text-gray-600">
                                    Drop files to Attach, or
                                    <span className="text-blue-600 underline">browse</span>
                                </span>
                            </span>
                            <input type="file" name="file_upload" className="hidden"/>
                        </label>
                    </div> */}


                    <div className="w-full h-[300px] cursor-pointer relative flex justify-center items-center border-2  bg-gray-200 rounded-xl">
                        <input type="file" name="file" onChange={uploadImage} className="z-20 opacity-0 cursor-pointer h-full w-full " />
                        <div className="absolute flex justify-center items-center gap-2">
                          
                            <img className={`h-[300px] w-full object-cover  ${checkFile?'opacity-1':'opacity-0'}`} alt='' src={selectedFile ? URL.createObjectURL(selectedFile) : null } />
                        </div>     
                        <div className="absolute w-10 h-10 bg-white rounded-full -bottom-2 -right-1 p-1">
                        {/* <Camera color="text-purple-500"/> */}
                        </div>   
                    </div>
                    </div>


                  <div className="mt-4">
                    <button
                      type="button"
                      onClick={uploadPost}
                      className="w-full inline-flex justify-center rounded-md border border-transparent bg-purple-100 px-4 py-2 text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2"

                    >
                      Post
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
