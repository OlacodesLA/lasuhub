//@ts-nocheck

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { client } from "@/lib/sanity";
import { blogQuery, blogDetailsQuery } from "@/utils/data";
import BlogDetails from "@/components/Landing/BlogDetails";
import Navbar from "@/components/Landing/Navbar";
import Transition from "@/components/Transition";

const Blog = () => {
  const [post, setPost] = useState();
  
  const router = useRouter()
  const {slug} = router.query
  
  useEffect(() => {
    const query = blogDetailsQuery({slug})
    console.log(slug)
    client.fetch(`${query}`).then((data)=>{
      setPost(data[0])
      console.log(data[0])
      console.log(post)
    })
  }, []);
  
  return (
    <div className="bg-gradient-to-br from-transparent to-purple-200">
    <Transition>
        <Navbar/>
        <BlogDetails post={post}/>
    </Transition>
  </div>
)};

export default Blog;

