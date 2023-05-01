//@ts-nocheck
import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import Router, { useRouter } from 'next/router';
import Transition from '@/components/Transition';
import Loader from "@/components/Loader"
import { userQuery, searchQuery, feedQuery } from '@/utils/data';
import {client} from '@/lib/sanity'
import { v4 as uuidv4 } from 'uuid';
import Left from '@/components/Containers/Left';
import Right from '@/components/Containers/Right';
import Middle from '@/components/Containers/Middle';
import Goodies from '@/components/Goodies';

import { userCreatedPostsQuery, userSavedPostsQuery } from '@/utils/data';
import { postDetailQuery, postDetailMorePinQuery } from '@/utils/data';
import PostDetails from '@/components/Containers/Middle/PostDetails';


const Save: FC = () => {
  const [user, setUser] = useState<any | null>(null)
  const [savedposts, setSavedPosts] = useState<any | null>(null);
  const [posts, setPosts] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [postDetail, setPostDetail] = useState();
  const [comment, setComment] = useState('');
  const [addingComment, setAddingComment] = useState(false);

  const { data, status } = useSession();
  const router = useRouter()
  const { pid } = router.query

  const fetchPostDetails = () => {
    const query = postDetailQuery(pid);

    if (query) {
      client.fetch(`${query}`).then((data) => {
        setPostDetail(data[0]);
        console.log(data);
        if (data[0]) {
          const query1 = postDetailMorePinQuery(data[0]);
          client.fetch(query1).then((res) => {
            setPosts(res);
          });
        }
      });
    }
  };

  useEffect(() => {
    fetchPostDetails();
  }, [pid]);

  const addComment = () => {
    if (comment) {
      setAddingComment(true);

      client
        .patch(pid)
        .setIfMissing({ comments: [] })
        .insert('after', 'comments[-1]', [{ comment, _key: uuidv4(), postedBy: { _type: 'postedBy', _ref: user._id } }])
        .commit()
        .then(() => {
          fetchPostDetails();
          setComment('');
          setAddingComment(false);
        });
    }
  };


  useEffect(() => {
    const userInfo = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();
    const id = userInfo?.email?.replace("@", "")
    const query = userQuery(id);

    client.fetch(query).then((data) => {
      setUser(data[0]);
      console.log(user)
    });

    const savedPinsQuery = userSavedPostsQuery(id);
    client.fetch(savedPinsQuery).then((data) => {
        setSavedPosts(data);
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
    <div className='w-full bg-gradient-to-br from-transparent to-purple-300'>
    <Transition>
      <div className=" w-full h-screen">
      
          <div className=" flex w-full h-full justify-normal items-start">
            <Left user={user}/>
            <div className="w-full">
            {/* <Middle posts={savedposts} user={user}/> */}
            <PostDetails postDetail={postDetail} user={user} addingComment={addingComment} setComment={setComment} comment={comment} addComment={addComment}/>
            {console.log(postDetail)}
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

export default Save;

