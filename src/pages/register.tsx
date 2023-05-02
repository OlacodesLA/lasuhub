//@ts-nocheck
import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { Fragment} from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { useSession, signIn, signOut } from 'next-auth/react';
import Router, { useRouter } from 'next/router';
import Transitions from '@/components/Transition';
import Loader from "@/components/Loader"
import Camera from '@/helpers/svgs/Camera';
import { userQuery, updateUserQuery } from '@/utils/data';
import {client, urlFor} from '@/lib/sanity'
import Image from 'next/image';


const people = [
  { id: 1, name: 'Arts' },
  { id: 2, name: 'Basic Medical Sciences' },
  { id: 3, name: 'Clinical Sciences' },
  { id: 4, name: 'Dentistry' },
  { id: 5, name: 'Education' },
  { id: 6, name: 'Engineering' },
  { id: 7, name: 'Law' },
  { id: 8, name: 'Management Sciences' },
  { id: 9, name: 'Science' },
  { id: 10, name: 'Social Sciences' },
  { id: 11, name: 'Transport' },
]



const NewUser: FC  = () => {
  const [user, setUser] = useState(null)
  const [matric, setMatric] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [name, setName] = useState<string>("")
  const [notEdit, setNotEdit] = useState(null)
  const [faculty, setFaculty] = useState(people[0])
  const [query, setQuery] = useState('')
  const { data, status } = useSession();
  const [error, setError] = useState<any | null>(null);
  const [selectedFile, setSelectedFile] = useState();
  const [checkFile, setCheckFile] = useState(false);
  const [imageAsset, setImageAsset] = useState<any | null>(null);
  const [WrongImageType, setWrongImageType] = useState(false)
  const [loading, setLoading] = useState(false);
  
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

const imagesubmission = () => {
    if (checkFile) {
        alert("File Uploaded");
        console.log(selectedFile);
    } else {
        alert("select a file");
    }
}

  const filteredPeople =
    query === ''
      ? people
      : people.filter((person) =>
          person.name
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
        )





  const handleSubmitSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    const id = user?.email?.replace("@", "")
    const query = updateUserQuery(id);
    try {
      await setLoading(true);
      await client.patch(id).set({
        name:name,
        matric: matric,
        image: imageAsset?.url,
        faculty: faculty.name,
      }).commit()
      await router.push('/app')
    } catch (error) {
      setError('An Error has occured');
    }

  }


  useEffect(() => {
    const userInfo = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();
    const id = userInfo?.email?.replace("@", "")
    const query = userQuery(id);
    setName(userInfo?.name)
    setMatric(userInfo?.matric)
    client.fetch(query).then((data) => {
      setUser(data[0]);
    }).then((data)=>{
      setMatric(data?.matric)
    });
    console.log(faculty.name)
  }, [faculty]);

  

  return <div>
      {
  loading && <Loader/>
  }
     <section className="bg-gray-50 min-h-screen flex items-center justify-center">
<div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
<div className="md:w-1/2 px-8 md:px-16">
<form onSubmit={handleSubmitSignIn} action="" className="flex flex-col gap-4 w-full">
  <div className="flex justify-center w-full">
<div className="h-24 w-24 cursor-pointer relative flex justify-center items-center border-2  bg-gray-200 rounded-full">
                        <input type="file" name="file" onChange={uploadImage} className="z-20 opacity-0 cursor-pointer h-full w-full " />
                        <div className="absolute flex justify-center items-center gap-2">
                            <img className={`h-24 w-24 object-cover rounded-full ${checkFile?'opacity-1':'opacity-0'}`} src={selectedFile ? URL.createObjectURL(selectedFile) : (null || user?.image)} />
                        </div>     
                        <div className="absolute w-10 h-10 bg-white rounded-full -bottom-2 -right-1 p-1">
                        <Camera color="text-purple-500"/>
                        </div>   
                    </div>
                    </div>
<input className="p-2 rounded-xl border w-full"  type="name" name="name" value={name} onChange={(e)=> setName(e.target.value) } placeholder="Name" />
<input className="p-2 rounded-xl border w-full"  type="name" name="name" value={matric} onChange={(e)=> setMatric(e.target.value) }   placeholder="Matric" />
<input className="p-2 rounded-xl border w-full opacity-70"  type="name" name="email" value={user?.email}  readOnly  placeholder="Email" />
<Combobox value={faculty} onChange={setFaculty}>
        <div className="relative mt-1">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-base">
            <Combobox.Input
              className="w-full border-none py-2 pl-3 pr-10 text-base leading-5 text-gray-900 focus:ring-0"
              displayValue={(person) => person.name}
              onChange={(e) => setFaculty(e.target.value)}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-2 text-base shadow-lg  focus:outline-2 sm:text-base">
              {filteredPeople.length === 0 && query !== '' ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredPeople.map((person) => (
                  <Combobox.Option
                    key={person.id}
                    className={({ active }) =>
                      `relative cursor-default select-none p-2 pl-10 pr-4 ${
                        active ? 'bg-teal-600 text-white' : 'text-gray-900'
                      }`
                    }
                    value={person}
                  >
                    {({ faculty, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            faculty ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {person.name}
                        </span>
                        {faculty ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center py-1 pl-3 ${
                              active ? 'text-white' : 'text-teal-600'
                            }`}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
</Combobox>
<button className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300">Register</button>
  <p className="text-xs mt-4 text-[#002D74]">If you are already a member, easily log in</p>
  </form>
</div>
<div className="md:block hidden w-1/2">
<img className="rounded-2xl w-full"  
alt="" src="https://images.unsplash.com/photo-1616606103915-dea7be788566?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80"/>
</div>
</div>
</section>
  </div>;
};

export default NewUser;
