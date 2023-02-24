import React from 'react';
import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import logo from '../assets/logo.png';
import { useNavigate } from "react-router-dom";

const sites = [
    { name: 'site-1', value: 'site-1' },
    { name: 'site-2', value: 'site-2' },
    // { name: 'site-3', value: 'site-3' },
    // { name: 'site-4', value: 'site-4' },
    // { name: 'site-5', value: 'site-5' },
    // { name: 'site-6', value: 'site-6' },
  ]

export default function StartTraining() {
    const [selected, setSelected] = useState([sites[0]]);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const navigate = useNavigate()
    const handleSubmitYes = () => {
        // navigate('/codeeditor1');
        // alert(selected.map(item => item.value).join(', '));
    };
    const handleSubmitNo = () => {
      navigate('/');
      // alert(selected.map(item => item.value).join(', '));
  };

    return (
        <div className="isolate bg-white">
              <div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]">
        <svg
          className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
          viewBox="0 0 1155 678"
        >
          <path
            fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
            fillOpacity=".3"
            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
          />
          <defs>
            <linearGradient
              id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
              x1="1155.49"
              x2="-78.208"
              y1=".177"
              y2="474.645"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#2596be" />
              <stop offset={1} stopColor="#44ba54" />
            </linearGradient>
          </defs>
        </svg>
      </div>
        <div className='w-full min-w-[500px]'>
        <p className='pb-8 text-left text-2xl'>Step 5: Confirm Training</p>
    <form>
    <div className="md:flex md:items-center mb-6">
      <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
        Are you sure you want to start training?
      </label>
      </div>
    <div className="inline-flex">
    <div className="md:w-1/2 px-6">
    <button className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" onClick={handleSubmitYes}>
        Yes
      </button>
      </div>
      <div className="md:w-1/2 px-6">
    <button className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" onClick={handleSubmitNo}>
        No
      </button>
      </div>
      </div>

  </form>
  </div>
            <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
            <svg
              className="relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]"
              viewBox="0 0 1155 678"
            >
              <path
                fill="url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)"
                fillOpacity=".3"
                d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
              />
              <defs>
                <linearGradient
                  id="ecb5b0c9-546c-4772-8c71-4d3f06d544bc"
                  x1="1155.49"
                  x2="-78.208"
                  y1=".177"
                  y2="474.645"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#2596be" />
                  <stop offset={1} stopColor="#44ba54" />
                </linearGradient>
              </defs>
            </svg>
          </div>

  </div>
);
};