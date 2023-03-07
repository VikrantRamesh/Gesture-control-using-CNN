import React from 'react';
import Carousel  from 'react-elastic-carousel';
import Slide1, {Slide2, Slide3, Slide4, Slide5} from './slides.js';
import  './index.css';


const Carous = () => {
  const breakpoints = [
    {width: 1, itemsToShow: 1},
  ];


  return (
    <Carousel  breakpoints = {breakpoints}>
      <Slide1/>
      <Slide2/>
      <Slide3/>
      <Slide4/>
      <Slide5/>
    </Carousel >
  );
};

export default Carous;