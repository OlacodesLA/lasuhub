//@ts-nocheck
import { CloudArrowUpIcon, LockClosedIcon, ServerIcon } from '@heroicons/react/20/solid'
import Image from 'next/image';

const features = [
  {
    name: 'Community.',
    description: 'A diverse and inclusive community of passionate learners and educators.',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'Personalization.',
    description: 'A personalized learning experience that adapts to your needs, interests, and goals',
    icon: LockClosedIcon,
  },
  {
    name: 'Search Engine.',
    description: 'A powerful search engine that allows you to find the content and experts you need quickly.',
    icon: ServerIcon,
  },
  {
    name: 'Social feed.',
    description: 'A social media-like feed where you can post questions, share resources, and connect with others.',
    icon: ServerIcon,
  },
]




export default function Features() {
  return (
    <div className="">
      <div className="mx-auto w-full ">
        <div className="relative isolate overflow-hidden  py-20 px-6 sm:rounded-3xl sm:py-24 sm:px-10 lg:py-24 xl:px-24">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-y-16 gap-x-8 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-center lg:gap-y-0">
            <div className="lg:row-start-2 lg:max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight text-gray-800 sm:text-4xl">
              Boost your productivity.
                <br />
              Start using our Web App today.
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-600">
              Join <span className='font-bold text-black'>Lasu<span className='text-purple-600'>Hub</span></span>   today and gain access to:
              </p>
            </div>
            <img
              src="/images/demo.png"
              alt="Product screenshot"
              className="relative -z-20 min-w-full max-w-xl rounded-xl shadow-2xl ring-1 ring-white/10 lg:row-span-4 lg:w-[64rem] lg:max-w-none"
              width={2432}
              height={1442}
            />
            <div className="max-w-xl lg:row-start-3 lg:mt-10 lg:max-w-md lg:border-t lg:border-white/10 lg:pt-10">
              <dl className="max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                {features.map((feature) => (
                  <div key={feature.name} className="relative">
                    <dt className="ml-9 inline-block font-semibold text-gray-800">
                      <feature.icon className="absolute top-1 left-1 h-5 w-5 text-indigo-500" aria-hidden="true" />
                      {feature.name}
                    </dt>{' '}
                    <dd className="inline">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <svg
            className="pointer-events-none absolute top-1/2 left-12 -z-10 h-[42.375rem] -translate-y-1/2 transform-gpu blur-3xl lg:top-auto lg:bottom-[-12rem] lg:translate-y-0"
            viewBox="0 0 1155 678"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="url(#c0458c57-1330-459f-9d5c-f0d75c210466)"
              fillOpacity=".25"
              d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
            />
            <defs>
              <linearGradient
                id="c0458c57-1330-459f-9d5c-f0d75c210466"
                x1="1155.49"
                x2="-78.208"
                y1=".177"
                y2="474.645"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#9089FC" />
                <stop offset={1} stopColor="#FF80B5" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  )
}
