//@ts-nocheck
import React from "react";

import { useRouter } from "next/router";
import Link from "next/link";
import { Home, PQ, Profile, Saved, Settings } from "@/helpers/svgs"

const Navigation = ({user}:any) => {

const router = useRouter();
const isActiveStyle = "flex w-full cursor-pointer bg-violet-900 p-1 rounded-md group text-white"
const isNotActiveStyle = "flex w-full cursor-pointer "


const style = "w-5 h-5 group-hover:text-white"

 const links = [
    {
    name:"Home",
    icon: <Home style={style}/>,
    link:"/app"
    },
    {
    name:"PQ",
    icon: <PQ style={style}/>,
    link:"/app/pq"
    },
    {
    name:"Saved",
    icon: <Saved style={style}/>,
    link:"/app/saved"
    },
    {
    name:"Settings",
    icon: <Settings style={style}/>,
    link:"/settings"
    },
    {
    name:"Profile",
    icon: <Profile style={style}/>,
    link:`/app/profile/${user?._id}`
    },
]

  return <div className="flex justify-center items-start z-50">
    <div className="fixed flex items-center gap-10 bg-gray-200 px-5 py-3 rounded-b-lg">
        {links?.map((link)=>{
            return(
            <Link href={`${link.link}`} key={link.name}  className="group hover:bg-purple-600 p-1 rounded-lg">
                <div className={({ isActive }: any) => (isActive ? isActiveStyle : isNotActiveStyle)}
                >
                    {link?.icon}
                </div>
            </Link>
            )
        })}
    </div>
  </div>;
};

export default Navigation;
