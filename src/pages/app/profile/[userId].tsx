//@ts-nocheck
import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import Router, { useRouter } from 'next/router';
import Transition from '@/components/Transition';
import Loader from "@/components/Loader"
import ProfilePage from '@/components/Containers/Middle/ProfilePage';
import { userQuery, searchQuery, feedQuery } from '@/utils/data';
import {client} from '@/lib/sanity'
import { v4 as uuidv4 } from 'uuid';
import Left from '@/components/Containers/Left';
import Right from '@/components/Containers/Right';
import Middle from '@/components/Containers/Middle';
import Goodies from '@/components/Goodies';
import { postDetailQuery, postDetailMorePinQuery } from '@/utils/data';
import PostDetails from '@/components/Containers/Middle/PostDetails';

const Profile: FC = () => {
  const [user, setUser] = useState<any | null>(null)
  const [savedposts, setSavedPosts] = useState<any | null>(null);
  const [posts, setPosts] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [postDetail, setPostDetail] = useState();
  const [comment, setComment] = useState('');
  const [addingComment, setAddingComment] = useState(false);

  const { data, status } = useSession();
  const router = useRouter()
  const { userId } = router.query


  useEffect(() => {
    const userInfo = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();
    const id = userInfo?.email?.replace("@", "")
    const query = userQuery(id);

    client.fetch(query).then((data) => {
      setUser(data[0]);
      console.log(user)
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
    <div className='w-full bg-gradient-to-br from-transparent to-purple-200'>
    <Transition>
      <div className=" w-full h-screen">
      
          <div className=" flex w-full h-full justify-normal items-start">
            <Left user={user}/>
            <div className="w-full">
            <ProfilePage userId={userId} authUser={user} />
            </div>
            {
              loading && <Loader/>
            }
            <Right user={user}/>
          </div>
          <Goodies/>
      </div>
      </Transition>
    </div>
  );
};

export default Profile;

