//@ts-nocheck
import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Google from "../../helpers/svgs/Google"
import Twitter from "../../helpers/svgs/Twitter"
import Transition from '@/components/Transition';
import Loader from '@/components/Loader'
import Info from '@/helpers/svgs/Info';
import {client} from "@/lib/sanity"
import { userQuery } from '@/utils/data';
import Link from 'next/link';


const SignIn: FC = () => {
  const { data:session, status, data } = useSession();
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] =useState(false)
  const [loginError, setLoginError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<any | null>(null);
  
  const router = useRouter();

  function isValidEmail(email : string) {
    return /\S+@\S+\.\S+/.test(email);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=> {
    setEmail(e.target.value);
    
  };
const auth = () => {

}



const google = async () =>{
  setLoading(true)
  await signIn('google')
}
const twitter = async () =>{
  setLoading(true)
  await signIn('twitter')
}

  const handleSubmitSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    setError(null);

     if  (isValidEmail(email)) {
      setLoading(true)
        try {
        await signIn('email', {
          redirect: true,
          email
        });

        const doc  = {
          _id : data?.user?.email?.replace("@", ""),
          _type: 'users',
          name : data?.user?.name,
          image: data?.user?.image,
          email : data?.user?.email,
          matric: data?.user?.matric,
          faculty: data?.user?.faculty,
        }

        client.createIfNotExists(doc).then(()=>{
          router.push('/')
        })


        // await router.push("/")
      } catch (error) {
        setLoading(false)
        setLoginError(true)
        console.log(loginError)
      }
    } else {
      setError('Email is invalid');
    }
    


  };



useEffect(()=>{

    if (session) {
      interface Docs {
        _id : string | null | undefined,
        _type: 'users',
        name : string | null | undefined,
        image: string | null | undefined,
        email: string | null | undefined,
        matric: string | null | undefined,
        faculty: string | null | undefined,

      }
      const doc : Docs = {
        _id : data?.user?.email?.replace("@", ""),
        _type: 'users',
        name : data?.user?.name,
        image: data?.user?.image,
        email: data?.user?.email,
        matric: data?.user?.matric,
        faculty: data?.user?.faculty,
      }
      const id = data?.user?.email?.replace("@", "")
      const query = userQuery(id);
      

      const checkData = async() =>{

        const checkedData = await client.fetch(query)
        console.log(checkedData.length === 0)

        if (checkedData.length === 0){
          await client.createIfNotExists(doc).then(()=>{
            router.push('/register')
          })
        } else if (checkedData.length === 1){
          await client.createIfNotExists(doc).then(()=>{
            router.push('/app')
          })
        }
      }

      checkData()

      if(data?.user){
        localStorage.setItem('user', JSON.stringify(data?.user));
      }
    }
},[router,session, data])


  if (status === "loading") {
    return <p>Loading...</p>
  }

return(
  <>
  <Transition>
  {
  loading && <Loader/>
  }
  <div className="">
  <section className="bg-gray-50 min-h-screen flex items-center justify-center">
<div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
<div className="md:w-1/2 px-8 md:px-16">
  <h2 className="font-bold text-2xl text-[#002D74]">Login</h2>
  <p className="text-xs mt-4 text-[#002D74]">If you are already a member, easily log in</p>
  <form onSubmit={handleSubmitSignIn} action="" className="flex flex-col gap-4 w-full">
    <div className="w-full">
    <input className="p-2 mt-8 rounded-xl border w-full" onChange={handleChange} type="name" name="email" value={email} placeholder="Email" />
    {error && 
    <div className="flex items-center w-full h-full pl-1 pt-1">
      <div className="">
      <Info/>
      </div>
    <h2 className='text-red-500 pl-2 text-sm'>
      {error}
    </h2>
    </div>}
    </div>
    <button className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300">Login</button>
  </form>

  <div className="mt-6 grid grid-cols-3 items-center text-gray-400">
    <hr className="border-gray-400"/>
    <p className="text-center text-sm">OR</p>
    <hr className="border-gray-400"/>
  </div>

  <button onClick={google} className="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 text-[#002D74]">
   <div className="mr-3"><Google/></div>
    Login with Google
  </button>
  <button onClick={twitter} className="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 text-[#002D74]">
    <div className="mr-3"><Twitter/></div>
    Login with Twitter
  </button>

  <div className="mt-5 text-xs border-b border-[#002D74] py-4 text-[#002D74]">
    <a href="#">Forgot your password?</a>
  </div>

  <div className="mt-3 text-xs flex justify-between items-center text-[#002D74]">
    <p>Don&apos;t have an account?</p>
    <Link href="/register">
    <button className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300">Register</button>
    </Link>
  </div>
</div>

{/* <!-- image --> */}
    <div className="md:block hidden w-1/2 h-[500px]">
      <img className="rounded-2xl w-full h-full object-cover"  
    alt="" src="/images/group-2.jpg"/>
    </div>
</div>
</section>
</div>
</Transition>
  </>
)
};

export default SignIn;



