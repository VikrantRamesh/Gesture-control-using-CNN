import React, {useState}  from 'react';
import  '../styles/index.css';
import g1 from '../Images/gesture-1.png';
import g2 from '../Images/gesture-2.png';
import Tensorflow from '../Images/Tensorflow.png';
import Numpy from '../Images/numpy.png';
import Python from '../Images/python.png';
import opencv from '../Images/opencv.png';
import mediapipe from '../Images/mediapipe.png';
import react from '../Images/react.png';
import tailwind from '../Images/tailwind.png';
import keras from '../Images/keras.png';
import lap from '../Images/Laptop.png';
const Tech = () => {

        const [Image, setImage] = useState(Python);
        const [imgName, setimgName] = useState("Python");

        const handleChange = (e, image_Name, image_Variable) => {
                setImage(image_Variable);
                setimgName(image_Name);
        }

    return (
    <div class='bg-gradient-to-t from-cyan-500 to-white overflow-hidden tech-bg  mt-20'>  

        <h2 class='text-6xl font-bold font-poppins text-center pt-12'>TECH</h2>

        <div class = 'h-2 max-w-screen-sm border-dotted bg-gradient-to-t from-cyan-300 to-cyan-100 rounded-lg mx-auto my-8 '></div>

        <div class='h-100 grid grid-cols-8 gap-4 max-w-screen-xl content-start place-items-center align-top place-content-center mx-auto'>
            {/* <div class='mx-10 my-5  bg-gradient-to-r from-pink-500 via-purple-400 to-orange-400 rounded-full py-2 px-2 '> */}
                <div class=' bg-white content-start place-items-center align-top  border-solid border-0 rounded-full hover:shadow-lg  hover:shadow-slate-500 z-40'>
                    <div class=' px-4 py-4 '>
                            <img src= {Python} class='h-auto hoverable w-auto z-40'  onMouseOver={e =>handleChange(e,'Python',Python)}></img>         
                    </div>
                </div>

                <div class=' bg-white content-start place-items-center align-top  border-solid border-0 rounded-full hover:shadow-lg  hover:shadow-slate-500 z-40'>    
                        <div class='px-4 py-4'>
                                <img src= {Tensorflow} class='h-auto hoverable w-auto z-10 ' onMouseOver={e =>handleChange(e,'Tensorflow',Tensorflow)}></img>         
                        </div>
                </div>


                <div class=' bg-white content-start place-items-center align-top  border-solid border-0 rounded-full hover:shadow-lg  hover:shadow-slate-500 z-40'>    
                        <div class='px-4 py-4'>
                                <img src= {opencv} class='h-auto hoverable w-auto z-10'  onMouseOver={e =>handleChange(e,'OpenCV',opencv)}></img>         
                        </div>

                </div>

                <div class=' bg-white content-start place-items-center align-top  border-solid border-0 rounded-full hover:shadow-lg  hover:shadow-slate-500 z-40'>    
                        <div class='px-4 py-4'>
                                <img src= {react} class='h-auto hoverable w-auto z-10 ' onMouseOver={e =>handleChange(e,'React',react)}></img>         
                        </div>
                </div>


                <div class=' bg-white content-start place-items-center align-top  border-solid border-0 rounded-full hover:shadow-lg  hover:shadow-slate-500 z-40'>
                    <div class='px-4 py-4'>
                            <img src= {Numpy} class='h-auto hoverable w-auto z-10'  onMouseOver={e =>handleChange(e,'Numpy',Numpy)}></img>         
                    </div>
                </div>

                <div class=' bg-white content-start place-items-center align-top  border-solid border-0 rounded-full hover:shadow-lg  hover:shadow-slate-500 z-40'>    
                        <div class='px-4 py-4'>
                                <img src= {mediapipe} class='h-auto hoverable w-auto z-10'  onMouseOver={e =>handleChange(e,'Mediapipe',mediapipe)}></img>         
                        </div>
                </div>

                <div class=' bg-white content-start place-items-center align-top  border-solid border-0 rounded-full hover:shadow-lg overflow-hidden hover:shadow-slate-500 z-40'>    
                        <div class=' px-4 py-4'>
                                <img src= {keras} class='h-auto hoverable w-auto z-10'  onMouseOver={e =>handleChange(e,'keras',keras)}></img>         
                        </div>
                </div>
            
                <div class=' bg-white content-start place-items-center align-top  border-solid border-0 rounded-full  z-40 hover:shadow-lg  hover:shadow-slate-500'>    
                        <div class=' px-4 py-4'>
                                <img src= {tailwind} class='h-auto hoverable w-auto z-10' onMouseOver={e =>handleChange(e,'Tailwind',tailwind)}></img>         
                        </div>
                </div>

        </div>
        <div class=' mx-auto max-w-screen-sm grid place-items-center py-20 z-40'>
                <img src= {lap} class='h-72 w-auto z-40'></img>    
                <div class=' bg-white content-start absolute place-items-center mb-16 border-solid border-0 rounded-full  z-20'>    
                        <div class=' px-4 py-4 z-20'>
                                <img src= {Image} class='h-12 w-12'></img>             
                        </div>
                </div>
                <div class='py-5 px-auto absolute pt-40 mb-10 z-50 text-4xl font-semibold'>{imgName}</div>
                    
        </div>
        
        <div class='hemi z-10'></div>

    </div>
 
    );
  };
  
  export default Tech;