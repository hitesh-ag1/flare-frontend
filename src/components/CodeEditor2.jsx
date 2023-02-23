import React from 'react';
import { Fragment, useState, useRef } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import logo from '../assets/logo.png';
import { Link } from "react-router-dom";
import { AceEditor } from 'react-ace';
import CodeMirror from '@uiw/react-codemirror';
import { StreamLanguage } from '@codemirror/language';
import '@codemirror/lang-python';
import brace from 'brace';
import 'brace/theme/monokai';
import { useNavigate } from "react-router-dom";
import api from '../../diagnokareApi';

const sites = [
    { name: 'site-1', value: 'site-1' },
    { name: 'site-2', value: 'site-2' },
    { name: 'site-3', value: 'site-3' },
    { name: 'site-4', value: 'site-4' },
    { name: 'site-5', value: 'site-5' },
    { name: 'site-6', value: 'site-6' },
  ]

export default function CodeEditor2() {
  const [selected, setSelected] = useState(`
import numpy as np
def metricSupportFn(inputs, outputs, labels, total, correct):
    labels = np.array([t.numpy() for t in labels])
    outputs = outputs.cpu().numpy()
    outputs_rounded = np.array(np.matrix.round(outputs))
    vals = []
    for i in (outputs_rounded == labels):
        vals.append(i.sum()/len(i))
    total += len(vals)
    correct += np.array(vals).sum()
    return total, correct

def metricCalcFn(correct, total):
    return (correct / float(total))

def optimizerFn(model, lr):
    import torch.optim as optim
    return optim.SGD(model.parameters(), lr=lr, momentum=0.9)

def criterionFn():
    import torch
    return torch.nn.CrossEntropyLoss()

def transformFn():
    from torchvision import transforms
    t = transforms.Compose([
                transforms.Resize((224, 224)),
                transforms.RandomHorizontalFlip(),
                transforms.RandomVerticalFlip(),
                transforms.ToTensor()
    ])
    return t
`);
    const editorRef = useRef(null);
    const navigate = useNavigate();
    const handleSubmit = (event) => {
      event.preventDefault();
      var code = (selected.replace(/(?:\r\n|\r|\n)/g, '\\n'));
      api.postModelParams(code);
      navigate('/flparams');
    }
  

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
        <p className='pb-8 text-left text-2xl'>Step 3: Code Editor for Model parameters </p>
    <form>
    <div className="md:flex md:items-center mb-6">
    <CodeMirror
        ref={editorRef}
        value={selected}
        options={{
          mode: 'python',
          theme: 'monokai',
          lineNumbers: true
        }}
        onChange={(editor) => {
          setSelected(editor);
        }}
        width="100%"
        height="500px"
        className='min-w-[800px] text-left'
      />
  </div>
  <div className="grid justify-items-center pt-4">
      <button className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" onClick={handleSubmit}>
        Submit
      </button>
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