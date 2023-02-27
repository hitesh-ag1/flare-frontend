import React from 'react';
import { Fragment, useState, useEffect } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import logo from '../assets/logo.png';
import { useNavigate } from "react-router-dom";
import Plot from 'react-plotly.js';
import api from '../../diagnokareApi';

const sites = [
    { name: 'site-1', value: 'site-1' },
    { name: 'site-2', value: 'site-2' },
    // { name: 'site-3', value: 'site-3' },
    // { name: 'site-4', value: 'site-4' },
    // { name: 'site-5', value: 'site-5' },
    // { name: 'site-6', value: 'site-6' },
  ]

export default function LiveTraining() {
    const [selected, setSelected] = useState([sites[0]]);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const navigate = useNavigate()

    const [data, setData] = useState({'site-1':[[],[]]});
    const [cleanData, setCleanData] = useState([
      // {
      //   name: "site-1",
      //   x: [0],
      //   y: [0],
      //   type: 'scatter',
      // },
    ])

    useEffect(() => {
      const fetchData = async () => {
        const response = await api.trainingMetrics();
        setData(response);
        var keys = Object.keys(response)
        var nsite = keys.length;
        var siteData = []
        for (let i = 1; i <= nsite; i++) {
          siteData = ([...siteData, {
            name: keys[i-1],
            x: response[keys[i-1]][0],
            y: response[keys[i-1]][1]
          }])
        }
        setCleanData(siteData);
        
      };
      const interval = setInterval(() => {
        fetchData()
      }, 60000);
      fetchData()
      return () => clearInterval(interval); 
      ;
    }, []);
  

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
        <p className='pb-8 text-left text-2xl'>Model Training In Process...</p>
    <form>
    <div className="md:flex md:items-center mb-6">
      <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
        Training Metrics
      </label>
      </div>
    <div className="inline-flex">
    <Plot
        data={cleanData
        //   [
        //   {
        //     name: "site-1",
        //     x: data['site-1'][0],
        //     y: data['site-1'][1],
        //     type: 'scatter',
        //   },
        //   {
        //     name: "site-2",
        //     x: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        //     y: [0.45, 0.56, 0.68, 0.73, 0.85, 0.87, 0.88, 0.89, 0.892],
        //     type: 'scatter',
        //   },
        // ]
        }
        layout={{
          "title": "Global Model Validation Accuracy",
          "xaxis": {
            "title": "Epochs"
          },
          "yaxis": {
            "title": "Accuracy"
          }
        }}
        // layout={{width: 620, height: 400, title: 'Validation Accuracy',"xaxis.title": "Accuracy", "yaxis.title": "Epochs"}}
      />
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