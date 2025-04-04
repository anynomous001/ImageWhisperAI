// components/ToggleSwitch.js
"use client"
import { useState } from 'react';

const ToggleSwitch = () => {
  const [isCanvas, setIsCanvas] = useState(false);



  return (
    <div
      className={`w-[160px] h-[40px] rounded-[15px] cursor-pointer flex items-center p-[5px] transition-colors duration-300 
        
        ${isCanvas ? 'bg-gray-300' : 'bg-green-500/85'

        }`}
    >
      <div
        onClick={() => { setIsCanvas(true) }}
        className={` flex justify-center items-center w-[80px] h-[30px]  rounded-full transition-transform duration-300 
          
          ${isCanvas ? 'bg-green-500/85' : 'bg-green-500/85'

          }`}
      >{'Canvas'}</div>
      <div
        onClick={() => { setIsCanvas(false) }}
        className={` flex justify-center items-center w-[80px] h-[30px]  rounded-full transition-transform duration-300 
         
          ${isCanvas ? 'bg-gray-300' : 'bg-gray-300'

          }`}
      >{'Gallery'}</div>
    </div>
  );
};

export default ToggleSwitch;
