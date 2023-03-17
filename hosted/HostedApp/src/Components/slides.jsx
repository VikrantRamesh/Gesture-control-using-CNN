import React from 'react';
import  '../styles/index.css';
import palm from '../Images/Palm.jpg';
import index from '../Images/Index.jpg';
import L from '../Images/L.jpg';
import Stone from '../Images/Stone.jpg';


const Slide1 = () => {



  const collection = document.getElementsByClassName('rec-arrow');
  
  const myElements = Array.from(collection);
  myElements.forEach((element) => {
        element.classList.add("clickable");
  });



  return (
    <div className = 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 slide  background-animate'>
        <div className="h-104 grid grid-cols-2 gap-6 content-start place-items-center align-top">
          <div className='border-8 ml-16 p-10 '>
            <h1 className="text-fuchsia-50 text-left font-sans text-7xl font-bold	">
              WELCOME TO GESTURES!
            </h1>
            <h2  className="text-left font-sans text-4xl font-semibold mt-6">
              GO MOUSE-FREE!
            </h2>
          </div>

          <div className=' ml-16 p-10 '>
            <h1 className="text-fuchsia-50 text-center font-sans text-3xl font-semibold place-content-center">
              JUST TRY SLOWLY MOVING YOUR PALM SIDEWAYS!
            </h1>
            <div className='items-center flex justify-center mt-4 border-8 mx-24'>
            <img src= {palm} height = '300' width = '200' className=' animate-wave'></img> 
            </div>
          </div>
        </div>
        <hr className="w-52 h-1 mx-auto my-8 bg-gray-100 border-0 rounded"></hr>
        <div>
            <h2 className="text-fuchsia-50 text-center font-sans text-6xl font-medium place-content-center mx-20">Why use mouse when you can create one out of thin air?</h2>
          </div>
          <div className="ball">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
           </div>
    </div>

  );
};

const Slide2 = () => {
  function triggerHover(e) {
    e.target.classList.add('text-slate-800');
  }
  function  DetriggerHover(e){
    e.target.classList.remove('text-slate-800');
  }

  return (
    <div className = 'slide bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 background-animate '>

        <div className=' ml-16 p-4'>
            <h1 onMouseOver={triggerHover} onMouseOut={DetriggerHover} className="text-fuchsia-50 hoverable font-sans text-5xl hover:text-6xl font-bold	text-center hover:text-slate-800 transition-colors">
              Yay! You did it!
            </h1>
        </div>

        <div className="h-104 grid grid-cols-2 hoverable gap-1 content-start place-items-center align-top">

          <div className=' ml-16 p-8 '>
            <h1 onMouseOver={triggerHover} onMouseOut={DetriggerHover} className="text-fuchsia-50 hoverable font-sans text-4xl text-center font-semibold place-content-center hover:text-slate-800 hover:text-5xl transition-all">
              Now use your Index Finger to control the cursor.
            </h1>
            <div className='items-center flex hoverable justify-center mt-4 border-8 mx-24  hover:border-slate-800 transition-all'>
            <img src= {index} height = '300' width = '200' className=' animate-wave'></img> 
            </div>
          </div>
          
          <div className=' p-2'>
            <h2 className="text-fuchsia-50 hoverable text-left font-sans text-5xl font-medium place-content-center mx-20  hover:text-slate-800 hover:text-6xl transition-all"
             onMouseOver={triggerHover} onMouseOut={DetriggerHover}>Use Palm and go to next slide ➜</h2>
          </div>
        </div>

        <hr className="w-52 h-1 mx-auto  bg-gray-100 border-0 rounded"></hr>
    <div className=' ml-16 p-10 '>
    <h1 onMouseOver={triggerHover} onMouseOut={DetriggerHover} className="text-fuchsia-50 hoverable font-sans text-5xl font-bold	text-center hover:text-slate-800 hover:text-6xl transition-all mb-12">
      Get Comfortable...There is more coming!
    </h1>
    </div>
    <div className="ball2">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
    </div>
  </div>
  );
};

const Slide3 = () => {
  return (
    <div className = 'slide bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 background-animate '>

        <div className=' ml-16 p-4 '>
            <h1 className="text-fuchsia-50 font-sans text-5xl font-bold	text-center">
              You are Rocking!
            </h1>
        </div>

        <div className="h-104 grid grid-cols-2 gap-1 content-start place-items-center align-top">

          <div className=' ml-16 p-8 '>
            <h1 className="text-fuchsia-50 font-sans text-4xl text-center font-semibold place-content-center mb-12">
              When the cursor is on the required position, use L gesture to Left-click!
            </h1>
            <div className='items-center flex justify-center mt-4 border-8 mx-24 '>
            <img src= {L} height = '300' width = '200'></img> 
            </div>
          </div>

          <div className=' p-2'>
            <h2 className="text-fuchsia-50 text-left font-sans text-5xl font-medium place-content-center mx-20 ">Try pressing the button to go to next slide ➜</h2>
          </div>
        </div>
        <hr className="w-52 h-1 mx-auto  bg-gray-100 border-0 rounded"></hr>

    <div className=' ml-16 p-10 '>
    <h1 className="text-fuchsia-50 font-sans text-5xl font-bold	text-center">
      Amazed? Explore more! 
    </h1>
    </div>
    <div className="ball3">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
           </div>

  </div>
  );
};

const Slide4 = () => {
  return (
    <div className = 'slide bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 background-animate'>

        <div className="h-104 grid grid-cols-8 content-start place-items-center align-top">

          <div className=' p-2 mx-12 col-span-5'>
            <h2 className="text-fuchsia-50 text-center font-sans text-7xl font-medium place-content-center mx-auto ">Need A break?</h2>
            <h1 className="text-fuchsia-50 font-sans text-4xl text-center font-semibold place-content-center my-12 mx-auto">
              Feel free to use rock gesture to transition from one gesture to another!
            </h1>
          </div>

          <div className='col-span-3'>
            
            <div className=' mt-4 border-8 '>
                <img src= {Stone} className='h-96 w-auto'></img> 
            </div>
          </div>


        </div>
        <hr className="w-52 h-1 my-8 mx-auto bg-gray-100 border-0 rounded"></hr>

    <div className=' ml-16 p-10 '>
    <h1 className="text-fuchsia-50 font-sans text-5xl font-bold	text-center">
      Beware! Holding Rock gesture for 8 seconds will exit gesture mode!
    </h1>
    </div>
    <div className="ball4">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
           </div>
  </div>
  );
};

const Slide5 = () => {
  return (
    <div className = 'slide bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 background-animate'>
      <div className=' ml-16 p-10 '>
          <h1 className="text-fuchsia-50 font-sans text-5xl font-bold	text-center">
            Tutorial Complete!
          </h1>
      </div>
      <div className="h-104 grid grid-cols-2 gap-1 content-start place-items-center align-top">

        <div className=' p-2'>
          <h2 className="text-fuchsia-50 text-left font-sans text-7xl font-medium place-content-center mx-40 ">Unlock the vertical Dimension!</h2>
        </div>

        <div className=' ml-16 p-8 '>
          <h1 className="text-fuchsia-50 font-sans text-4xl text-center font-semibold place-content-center">
            Slowly drag palm down to Scoll!
          </h1>
          <div className='items-center flex justify-center mt-4 border-8 mx-24 overflow-hidden'>
            <img src= {palm} height = '300' width = '200' className=' animate-bounce'></img> 
          </div>
        </div>


      </div>
      <hr className="w-52 h-1 mx-auto bg-gray-100 border-0 rounded"></hr>

      <div className=' mx-16 p-10 '>
            <h1 className="text-fuchsia-50 font-sans text-5xl font-bold	text-center">
            Discover more ⮟<br/>
      </h1>
      </div>

      <div className="ball5">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
      </div>
    </div>
  );
};

export default Slide1;
export {
  Slide2,
  Slide3,
  Slide4,
  Slide5
};