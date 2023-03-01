import React from 'react';
import { Fragment, useState, useEffect, useRef } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import logo from '../assets/logo.png';
import { useNavigate } from "react-router-dom";
import Plot from 'react-plotly.js';
import api from '../../diagnokareApi';
import CodeMirror from '@uiw/react-codemirror';
import { StreamLanguage } from '@codemirror/language';
import '@codemirror/lang-python';
import brace from 'brace';
import 'brace/theme/monokai';
import Modal from 'react-modal';

export default function Results() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const navigate = useNavigate()
    const editorRef = useRef(null);
    const [trainingLogs, setTrainingLogs] = useState("Loading...");
    const [accuracy, setAccuracy] = useState({'site-1':[]});
    const [data, setData] = useState({'site-1':[]});
    const [avgData, setAvgData] = useState([0,0])
    const [cleanData1, setCleanData1] = useState([]);
    const [cleanData2, setCleanData2] = useState([]);
    const [showMetrics, setShowMetrics] = useState(false);
    const [showLogs, setShowLogs] = useState(false);
    const [detailedAcc, setDetailedAcc] = useState(false);
    const [status, setStatus] = useState("Inititalizing...")
    const fetchData = async () => {
      var avgacc = await api.viewLatestAvgResults()
      var acc = await api.viewLatestResults()
      if(avgacc[0] == 1){
        console.log(acc[1])
        setAvgData(avgacc[1]);
      }
      else{
        alert("Error in getting results: "+avgacc[1]+" with message "+avgacc[2])
      }
      if(acc[0] == 1){
        console.log(acc[1])
        setAccuracy(acc[1]);
      }
      else{
        alert("Error in getting results: "+acc[1]+" with message "+acc[2])
      }
      var response = await api.latesttrainingMetrics(true);
      if(response[0] == 1){
      response = response[1]
      setData(response);
      var keys = Object.keys(response)
      var nsite = keys.length;
      var siteData1 = []
      for (let i = 1; i <= nsite; i++) {
        siteData1 = ([...siteData1, {
          name: keys[i-1],
          x: response[keys[i-1]]['val_acc_global_model'][0],
          y: response[keys[i-1]]['val_acc_global_model'][1]
        }])
      }
      setCleanData1(siteData1);

      var siteData2 = []
      for (let i = 1; i <= nsite; i++) {
        siteData2 = ([...siteData2, {
          name: keys[i-1],
          x: response[keys[i-1]]['train_loss'][0],
          y: response[keys[i-1]]['train_loss'][1]
        }])
      }
      setCleanData2(siteData2);
      }
      // }
      // else{
      //   alert("Error in loading tensorboard metrics: "+response[1]+" with message "+response[2]);
      // }
      // const response2 = await api.latesttrainingLogs();
      // if(response2[0] == 1){
      //   setTrainingLogs(response2[1]);
      // }
      // else{
      //   alert("Error in loading training logs: "+response2[1]+" with message "+response2[2]);
      // }
      
    };
    
    useEffect(() => {
      fetchData()
    }, []);
  
    const handleHomePage = () => {
      navigate("/");
    };
    const handleNextPage = () => {
      navigate("/results");
    };
    const handleAbortJob = async () => {
      var response = await api.abortLatestJob();
      if(response[0] == 1){
        alert("Successfully aborted job");
        navigate("/");
      }
      else{
        alert("Failed to abort job: "+response[1]+" with message "+response[2]);
      }
    };

    const handleRefresh = () => {
      fetchData();
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
        <p className='pb-8 text-left text-2xl'>View Results</p>
        <div className='flex-col justify-start items-center pb-4'>
        <div className='text-left justify-start text-lg'>
          Train accuracy: {avgData[0].toFixed(2)}
        </div>
        <div className='text-left justify-start text-lg'>
          Test accuracy: {avgData[1].toFixed(2)}
        </div>
        </div>
        <div className='flex space-x-4'>
        <button
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
        onClick={() => setShowMetrics(true)}
      >
        Show Metrics
      </button>
      <button
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
        onClick={() => setDetailedAcc(true)}
      >
      Detailed Accuracies
      </button>
      <button
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
        onClick={() => setShowLogs(true)}
      >
        Show Logs
      </button>
      <button
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
        onClick={() => handleHomePage()}
      >
      Home Page
      </button>
      {status == 'Finished successfully' && 
      <button
        className="bg-green-500 text-white font-bold py-2 px-4 rounded"
        onClick={() => handleNextPage()}
      > View Results
      </button>}
      
      </div>
    {/* <form> */}
    <Modal
        isOpen={showMetrics}
        className="bg-white rounded shadow-xl p-4"
        overlayClassName="fixed h-full w-full top-0 left-0 flex items-center justify-center"
        onRequestClose={() => setShowMetrics(false)}
      >
    <div className="md:flex mb-6 flex-col pt-3">
    <div className="md:flex md:items-center mb-6">
      <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
        Training Metrics
      </label>
      </div>
    {/* <div className="flex-col overflow-y-scroll"> */}
    <div className="">
    <Plot
        data={cleanData1}
        layout={{
          // "width": 620, "height": 300,
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
      <Plot
        data={cleanData2}
        layout={{
          // "width": 620, "height": 300,
          "title": "Training Loss",
          "xaxis": {
            "title": "Epochs"
          },
          "yaxis": {
            "title": "Loss"
          }
        }}
        // layout={{width: 620, height: 400, title: 'Validation Accuracy',"xaxis.title": "Accuracy", "yaxis.title": "Epochs"}}
      />
    </div>
    </div>
    </Modal>
    <Modal
        isOpen={showLogs}
        className="bg-white rounded shadow-xl p-4"
        overlayClassName="fixed h-full w-full top-0 left-0 flex items-center justify-center"
        onRequestClose={() => setShowLogs(false)}
      >
    <div className="md:flex mb-6 flex-col pt-3">
    <div className="md:w-1/5 py-2">
    <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
        Training Logs
    </label>
    </div>
    <div className="md:w-4/5 py-2">
    <CodeMirror
        ref={editorRef}
        value={trainingLogs}
        options={{
          mode: 'python',
          theme: 'monokai',
          lineNumbers: true
        }}
        onChange={(editor) => {
          setTrainingLogs(editor);
        }}
        width="100%"
        height="400px"
        className='min-w-[800px] text-left'
      />
      </div>
  
      </div>
      </Modal>
      <Modal
        isOpen={detailedAcc}
        className="bg-white rounded shadow-xl p-4"
        overlayClassName="fixed h-full w-full top-0 left-0 flex items-center justify-center"
        onRequestClose={() => setDetailedAcc(false)}
      >
    <div className="md:flex mb-6 flex-col pt-3">
    <div className="md:w-1/5 py-2">
    <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
        Detailed Accuracies
    </label>
    </div>
    <div className="md:w-4/5 py-2">
    <p className='text-left text-lg pb-4 min-w-[500px] p-6'>
        Train Data:
        <table className="border-2 border-gray-500">
      <thead>
        <tr>
          <th className='px-4 py-2 text-left text-lg font-medium text-gray-800 bg-gray-100 border-b border-gray-500'>Site Name</th>
          {(['Global', 'Site-1', 'Site-2']).map((fileName) => (
            <th className="px-4 py-2 text-left text-lg font-medium text-gray-800 bg-gray-100 border-b border-gray-500" key={fileName}>{fileName}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Object.keys(accuracy).map((site) => (
          <tr key={site}>
            <td className='px-4 py-2 text-left border border-gray-500'>{site}</td>
            {Object.keys(accuracy[Object.keys(data)[0]]).map((fileName) => (
              <td className="px-4 py-2 text-left border border-gray-500" key={fileName}>
                  <span>{accuracy[site][fileName].train_accuracy.toFixed(2)}</span>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>

Test Data:
    <table className="border-2 border-gray-500">
      <thead>
        <tr>
          <th className='px-4 py-2 text-left text-lg font-medium text-gray-800 bg-gray-100 border-b border-gray-500'>Site Name</th>
          {(['Global', 'Site-1', 'Site-2']).map((fileName) => (
            <th className="px-4 py-2 text-left text-lg font-medium text-gray-800 bg-gray-100 border-b border-gray-500" key={fileName}>{fileName}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Object.keys(accuracy).map((site) => (
          <tr key={site}>
            <td className='px-4 py-2 text-left border border-gray-500'>{site}</td>
            {Object.keys(accuracy[Object.keys(data)[0]]).map((fileName) => (
              <td className="px-4 py-2 text-left border border-gray-500" key={fileName}>
                  <span>{accuracy[site][fileName].val_accuracy.toFixed(2)}</span>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
        </p>

      </div>  
      </div>
      </Modal>


  {/* </form> */}
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