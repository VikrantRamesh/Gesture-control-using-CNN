import React from 'react';
import  '../styles/index.css';
import g1 from '../Images/gesture-1.png';
import g2 from '../Images/gesture-2.png';
const Tips = () => {
    return (
    <div class = 'bg-gradient-to-t to-cyan-500 from-white'>  
        <h2 class='text-6xl font-bold font-poppins text-center pt-20'>TIPS</h2>


        <div class='grid grid-cols-8 my-10 mx-20 '>
                <div class='flex content-center mx-10 my-5 col-span-5  bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl py-2 px-2 '>
                    <div class=' flex px-8 py-10 bg-white place-items-center  border-solid border-0 rounded-3xl hover:shadow-lg  hover:shadow-slate-500 hover:mx-11 hover:my-6 transition-all'>
                            <h2 class='text-left text-4xl font-medium font-dosis'>Make sure that your hand is away from ur face or body to experience the best performance. Moving your hand consciously is highly appreciated.</h2>
                    </div>
                </div>
                <div class='col-span-3 pr-16 py-5'>
                        <img src= {g1} class='h-auto w-auto'></img>         
                </div>
        </div>

        <div class='grid grid-cols-8 my-10 mx-20'>
                <div class='col-span-3 px-8 pb-2'>
                                <img src= {g2} class='h-auto w-auto'></img>         
                </div>
                <div class='flex content-center mx-10 my-5 col-span-5  bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl py-2 px-2'>
                    <div class=' flex px-8 py-10 bg-white place-items-center  border-solid border-0 rounded-3xl hover:shadow-lg  hover:shadow-slate-500  hover:mx-11 hover:my-6 transition-all'>
                            <h2 class='text-left text-4xl font-medium font-dosis'>Move your hand at a slow pace. Your legendary hands might move at supersonic speed... But frame-rate of your video has its limits 😂</h2>
                    </div>
                </div>
        </div>
        {/*<div class = 'h-2 max-w-screen-md border-dotted bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg mx-auto mt-20 mb-16'></div>*/}
    </div>
 
    );
  };
  
  export default Tips;