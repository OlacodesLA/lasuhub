//@ts-nocheck
import { client } from '@/lib/sanity';
import { urlFor } from '@/lib/sanity';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { blogQuery } from '@/utils/data';
import Link from 'next/link';




  

  export default function Blog() {
    const [posts, setPosts] = useState([])



    useEffect(() => {
      client.fetch(blogQuery).then((data)=>{
        setPosts(data)
        console.log(data)
      })
    }, []);


    return (
      <div className="relative  px-6 pt-16 pb-20 lg:px-8 lg:pt-24 lg:pb-28">
        <div className="absolute inset-0">
          <div className="h-1/3 sm:h-2/3" />
        </div>
        <div className="relative mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">From the blog</h2>
            <p className="mx-auto mt-3 max-w-2xl text-xl text-gray-500 sm:mt-4">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa libero labore natus atque, ducimus sed.
            </p>
          </div>
          <div className="mx-auto mt-12 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3">
            {posts.map((post) => (
              <div key={post?._id} className="flex flex-col overflow-hidden rounded-lg group">
                <Link href={`/blog/${post?.slug?.current}`}>
                <div className="flex-shrink-0">
                  <div className="rounded-xl overflow-hidden">
                  <img className="h-48 w-full object-cover rounded-xl group-hover:scale-110 transition-all duration-300 ease-in" src={urlFor(post?.image)} alt="" />
                  </div>
                </div>
                <div className="flex flex-1 flex-col justify-between pt-6">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-indigo-600">
                      <a href={post?.category} className="hover:underline">
                        {post?.category}
                      </a>
                    </p>
                    <a href={post?.href} className="mt-2 block">
                      <p className="text-xl font-semibold text-gray-900">{post?.description}</p>
                    </a>
                  </div>
                  <div className="mt-6 flex items-center">
                    <div className="flex-shrink-0">
                      <a href={post?.author?.href}>
                        <span className="sr-only">{post?.author?.name}</span>
                        <img className="h-10 w-10 rounded-full" src={post?.author?.image} alt="" />
                      </a>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">
                        <a href={post?.author?.href} className="hover:underline">
                          {post?.author?.name}
                        </a>
                      </p>
                      <div className="flex space-x-1 text-sm text-gray-500">
                        <time dateTime={post?.datetime}>{post?.date}</time>
                        <span aria-hidden="true">&middot;</span>
                        <span>{post?.readingtime} read</span>
                      </div>
                    </div>
                  </div>
                </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
  