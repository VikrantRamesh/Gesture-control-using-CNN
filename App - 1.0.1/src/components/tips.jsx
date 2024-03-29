import React from 'react';
import  '../styles/index.css';
import g1 from '../Images/gesture-1.png';
import g2 from '../Images/gesture-2.png';
const Tips = () => {
        function triggerHover(e) {
                e.target.classList.add('shadow-lg','mx-11', 'my-6');
        }
        function  DetriggerHover(e){
                e.target.classList.remove('shadow-lg','mx-11', 'my-6');
        }

    return (
    <div className = 'bg-gradient-to-t to-cyan-500 from-white'>  
        <h2 className='text-6xl font-bold font-poppins text-center pt-20'>TIPS</h2>


        <div className='grid grid-cols-8 my-10 mx-20 '>
                <div className='flex content-center mx-10 my-5 col-span-5  bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl py-2 px-2 '>
                    <div className=' flex px-8 py-10 bg-white place-items-center hoverable  border-solid border-0 rounded-3xl hover:shadow-lg  hover:shadow-slate-500 hover:mx-11 hover:my-6 transition-all'
                    onMouseOver={triggerHover} onMouseOut={DetriggerHover}>
                            <h2 className='text-left text-4xl font-medium font-dosis'>Make sure that your hand is away from ur face or body to experience the best performance. Moving your hand consciously is highly appreciated.</h2>
                    </div>
                </div>
                <div className='col-span-3 pr-16 py-5'>
                        <img src= {g1} className='h-auto w-auto'></img>         
                </div>
        </div>

        <div className='grid grid-cols-8 my-10 mx-20'>
                <div className='col-span-3 px-8 pb-2'>
                                <img src= {g2} className='h-auto w-auto'></img>         
                </div>
                <div className='flex content-center mx-10 my-5 col-span-5  bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl py-2 px-2'>
                    <div className=' flex px-8 py-10 bg-white place-items-center hoverable border-solid border-0 rounded-3xl hover:shadow-lg  hover:shadow-slate-500  hover:mx-11 hover:my-6 transition-all'
                    onMouseOver={triggerHover} onMouseOut={DetriggerHover} >
                            <h2 className='text-left text-4xl font-medium font-dosis'>Move your hand at a slow pace. Your legendary hands might move at supersonic speed... But frame-rate of your video has its limits 😂</h2>
                    </div>
                </div>
        </div>
        {/*<div className = 'h-2 max-w-screen-md border-dotted bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg mx-auto mt-20 mb-16'></div>*/}
    </div>
 
    );
  };
  
  export default Tips;