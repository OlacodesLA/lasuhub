import type { FC } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import Router, { useRouter } from 'next/router';

const Home: FC = () => {
  const { data, status } = useSession();
  const router =useRouter()

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
    <>
    <h1>Anyone can view this page</h1>
    {
       data && 
      <div>
        <p className='text-center pt-40'>User: {data?.user?.name}</p>
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
    </>
  );
};

export default Home;

