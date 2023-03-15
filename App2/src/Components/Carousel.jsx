import React, { useEffect, useRef, useState } from 'react';
import Carousel from 'react-elastic-carousel';
import Slide1, { Slide2, Slide3, Slide4, Slide5 } from './slides.jsx';


const Carous = ({ diff }) => {
  const breakpoints = [{ width: 1, itemsToShow: 1 }];
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const cooldownRef = useRef(false);

  useEffect(() => {
    if (diff > 0.05 && currentIndex < 4 && !cooldownRef.current) {
      carouselRef.current.goTo(currentIndex + 1);
      setCurrentIndex(currentIndex + 1);
      cooldownRef.current = true;
      setTimeout(() => {
        cooldownRef.current = false;
      }, 500);
    } else if (diff < -0.05 && currentIndex > 0 && !cooldownRef.current) {
      carouselRef.current.goTo(currentIndex - 1);
      setCurrentIndex(currentIndex - 1);
      cooldownRef.current = true;
      setTimeout(() => {
        cooldownRef.current = false;
      }, 500);
    }
  }, [diff, currentIndex]);

  return (
    <Carousel
      currentIndex={currentIndex}
      breakpoints={breakpoints}
      ref={carouselRef}
      onSlide={(currentItemIndex) => {
        setCurrentIndex(currentItemIndex);
      }}
    >
      <Slide1 />
      <Slide2 />
      <Slide3 />
      <Slide4 />
      <Slide5 />
    </Carousel>
  );
};

export default Carous;
