import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import {FaCaretDown} from "react-icons/fa"

export default function Chevron() {
  return (
    <div className="w-full text-right z-50">
      <Menu as="div" className="relative inline-block text-left z-50">
        <div>
          <Menu.Button className="">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="ml-2 -mr-1 w-5 h-5 pt-1 text-black hover:text-gray-700">
  <path fillRule="evenodd" d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z" clipRule="evenodd" />
</svg>
</Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <div className=" w-full h-full bg-white z-50">
          <Menu.Items className="absolute right-0 mt-2 bg-white rounded-xl z-50 ">
            <div className=" pl-2 py-2 z-50 pro">
            <style jsx>{`
              .pro{
                width: 300px;
                padding: 10px 20px;
              }
              .pro .profile {
                margin-bottom: 25px;
                border-radius: 40px;
                width: 100%;
                font-weight: 600;
                font-family: 'DM Sans', sans-serif;
              }
              .line{
                border-radius: 40px;
                width: 100%;
                height: .6px;
                background-color: #808080;
                margin-bottom: 20px;
              }
          `}
      </style>
              <p className="profile">Profile</p>
              <div className="line"></div>
              <Menu.Item>
                  <button className="flex group gap-2 items-center w-full">
                    <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-red-600 hover:text-red-600">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                    </svg>
                    <p className="">
                    Logout
                    </p>
                  </button>
              </Menu.Item>
            </div>
          </Menu.Items>
          </div>
        </Transition>
      </Menu>
    </div>
  );
}
