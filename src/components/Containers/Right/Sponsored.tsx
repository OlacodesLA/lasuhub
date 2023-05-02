//@ts-nocheck
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import Image from "next/image";
import { client } from "@/lib/sanity";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper";
import { sponsoredQuery } from "@/utils/data";

const Sponsored = () => {

    const [sponsors, setSponsors] = useState(null)


    useEffect(() => {
        client.fetch(sponsoredQuery).then((data)=>{
            setSponsors(data)
            console.log(sponsors)
        })
    }, []);
    


  return <Swiper pagination={true} modules={[Pagination]} className="w-full h-full rounded-xl">

  <SwiperSlide className="w-full h-full rounded-xl">
  {
        sponsors?.map((sponsor, index)=>{
            return(
            <Link key={index}  href={sponsor?.link} className="w-full h-full">
            <div className="w-full h-full rounded-xl relative">
                <Image src={sponsor?.image?.asset?.url} className=" object-cover rounded-xl w-full h-full" fill alt="" srcset="" />
            </div>
            </Link>
            )
        })
    }
  </SwiperSlide>
</Swiper>;
};

export default Sponsored;
