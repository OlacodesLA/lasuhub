//@ts-nocheck
import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import Router, { useRouter } from 'next/router';
import Transition from '@/components/Transition';
import Loader from "@/components/Loader"
import { userQuery } from '@/utils/data';
import {client} from '@/lib/sanity'
import Landing from '@/components/Landing';
import Features from '@/components/Landing/Features';
import Comment from '@/components/Containers/Middle/Comment';
import Blog from '@/components/Landing/Blog';

const Home: FC = () => {
  const [user, setUser] = useState(null)
  const { data, status } = useSession();
  const router = useRouter()


  useEffect(() => {
    const userInfo = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();
    const id = userInfo?.email?.replace("@", "")
    const query = userQuery(id);

    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, []);


  // if (status === 'loading') return <p>Loading...</p>;

  // if (data) {
  //   return (
  //     <div>
  //       <p className='text-center pt-40'>User: {data?.user?.name}</p>
  //       <button className='flex justify-center w-full' onClick={() => signOut({ redirect: false })}>Sign Out</button>
  //     </div>
  //   );
  // }

  return (
    <><div className="">
    <Transition>
      <div className="bg-gradient-to-br from-transparent to-purple-200">
      <Landing user={user}/>
      <Features/>
      <Blog/>
      </div>
    <h1>Anyone can view this page</h1>
    {
       data && 
      <div>
        <p className='text-center pt-40'>User: {user?.name}</p>
        <img className='rounded-full' src={user?.image}  alt="" srcset=""  />
        <button className='flex justify-center w-full' onClick={() => signOut({ redirect: false })}>Sign Out</button>
      </div>
    }

    {
       status === 'unauthenticated' && 
      <div>
        <p className='text-center pt-40'>User: Not Logged In</p>
        <button className='flex justify-center w-full' onClick={()=>router.push("/auth/signin")} >Login</button>
      </div>
    }
    </Transition>
    </div>
    </>
  );
};

export default Home;

