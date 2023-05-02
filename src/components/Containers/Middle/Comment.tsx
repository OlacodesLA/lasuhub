//@ts-nocheck




import { Fragment } from 'react'
import { ChatBubbleLeftEllipsisIcon, TagIcon, UserCircleIcon } from '@heroicons/react/20/solid'
import { log } from 'console'
import Image from 'next/image'




function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Comment({postDetail}:any) {
  return (
    <div className="flow-root">
        {console.log(postDetail)}
      <ul role="list" className="-mb-8">
        {postDetail?.comments?.map((activityItem, activityItemIdx) => (
          <li key={activityItem._key}>
            <div className="relative pb-8">
              {activityItemIdx !== postDetail?.comments?.length - 1 ? (
                <span className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-purple-200" aria-hidden="true" />
              ) : null}
              <div className="relative flex items-start space-x-3">
                    <div className=" relative">
                      <div className="relative h-10 w-10">
                      <Image
                        className="flex  items-center justify-center rounded-full bg-gray-400 ring-8 ring-white"
                        src={activityItem.postedBy.image}
                        layout='fill'
                        alt=""
                      />
                      </div>

                      <span className="absolute -bottom-0.5 -right-1 rounded-tl  px-0.5 py-px">
                        <ChatBubbleLeftEllipsisIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div>
                        <div className="text-sm">
                          <a href="#" className="font-medium text-black font-bold">
                            {activityItem.postedBy.name}
                          </a>
                        </div>
                        <p className="mt-0.5 text-[12px] text-gray-500"> {activityItem.postedBy.matric}</p>
                      </div>
                      <div className="mt-2 text-sm text-gray-700">
                        <p>{activityItem.comment}</p>
                      </div>
                    </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
