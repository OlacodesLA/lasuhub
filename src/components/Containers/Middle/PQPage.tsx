//@ts-nocheck
import React, {useState} from "react";
import PQGrid from "./PQGrid";
import Modal from "./Modal";

const PQPage = () => {
  const [isOpen, setIsOpen] = useState(true);


  
  return( 
  <div className="flex justify-center"> 
  <div className=" w-[50%] h-full ">
  <h2 className="font-bold text-center pt-16">Past Questions</h2>
    <div className="pt-10">
  <PQGrid />
  </div>

    </div>
    </div>
  )
};

export default PQPage;
