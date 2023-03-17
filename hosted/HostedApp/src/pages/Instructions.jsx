import Navbar from '../components/navbar'
import Footer from '../components/footer'
import Tips from '../components/tips'
import Tech from '../components/tech'
import Carous from '../components/Carousel'
import GestureDetector from '../components/GestureDetector.jsx'
import ModelProvider from '../context/ModelContext.jsx'
import {useRef, useEffect, useState} from 'react';

// const dimensions = [window.innerHeight, window.innerWidth];

const Instructions = () => {

    const [predictionData, setPredictionData] = useState({prediction : null, landmarks : []});
    const predictionRef = useRef(predictionData);
    const [carouselIndex, setCarouselIndex] = useState(0);
    const pivotStateRef = useRef(false);  // Using a ref to handle this to stay detached from the component render cycle
    const pivotCoordinates = useRef({x : 0, y : 0});
    const currentCoordinates = useRef({x : 0, y : 0});
    const carouselCooldown = useRef(false);  // Carousel cooldown is to ensure movement across multiple slides of the carousel across transitions is disallowed
    const [canMoveCarousel, setCanMoveCarousel] = useState(true);
    const scrollRef = useRef(null)

  
    
    useEffect(() => {
        predictionRef.current = predictionData;
        console.log(predictionData)

        // Moving the carousel - Move the carousel only if the carouselCooldown state is false

        if(carouselCooldown.current) setCanMoveCarousel(false);


        const diff = pivotCoordinates.current.x - currentCoordinates.current.x;     
        if(pivotStateRef.current && !carouselCooldown.current){
            currentCoordinates.current = {x : predictionData.landmarks[0].x, y: predictionData.landmarks[0].y};
            // console.log(diff);
            if(diff > 0.05 && carouselIndex < 5){
                console.log(carouselIndex);
                setCarouselIndex(carouselIndex+1);
                carouselCooldown.current = true;
                setTimeout(() => {
                    console.log(carouselIndex);
                    carouselCooldown.current = false;
                    setCanMoveCarousel(true);
                }, 1000)
            }else if(diff < -0.05 && carouselIndex > 0){
                setCarouselIndex(carouselIndex-1);
                carouselCooldown.current = true;
                setTimeout(() => {
                    carouselCooldown.current = false;
                    setCanMoveCarousel(true);
                }, 1000)
            }   
        }

       if(pivotStateRef.current){
        const verticalDiff = (pivotCoordinates.current.y - currentCoordinates.current.y)*window.innerHeight;
        if(verticalDiff < -30 && Math.abs(diff) < 0.05){
            console.log("Scrolling")
            window.scrollBy(0,window.innerHeight/25);
        }else if(verticalDiff > 30 && Math.abs(diff) < 0.05){
            console.log("Scrolling")
            window.scrollBy(0, -window.innerHeight/25);

        }
    
       }

       
        if(predictionData.prediction === 'Palm' && !pivotStateRef.current){
           // Upon detecting 'Palm' wait for 3 seconds with a check at 1.5s (to ensure) and then enters pivot mode
            setTimeout(() => {
                if(predictionRef.current.prediction === 'Palm' && !pivotStateRef.current){
                    setTimeout(() => {
                        pivotStateRef.current = true;
                        pivotCoordinates.current = {x : predictionData.landmarks[0].x, y: predictionData.landmarks[0].y}
                    }, 1500);
                }
            }, 1500); 
        }else if(predictionData.prediction !== 'Palm' && pivotStateRef.current){
            // If any other gesture is detected for more than 0.75s while in pivot state, we invalidate pivot state
            setTimeout(() => {
                console.log(`---${predictionRef.current.prediction}---`);
                if(predictionRef.current.prediction !== 'Palm') pivotStateRef.current = false;
            }, 500);
        }


    }, [predictionData]);

    return(
        <div ref={scrollRef}>
            <Navbar/>
            {/* <strong>
                <pre>
                {pivotStateRef.current ? 
`Pivoted x : ${pivotCoordinates.current.x.toFixed(3)}, y : ${pivotCoordinates.current.y.toFixed(3)}\n${predictionData.prediction}\n[x] : ${currentCoordinates.current.x.toFixed(3)}, [y] : ${currentCoordinates.current.y.toFixed(3)}\ndiff = ${(pivotCoordinates.current.x - currentCoordinates.current.x).toFixed(3)}` : 
                    predictionData.prediction}
                </pre>
            </strong>
            <strong className='block'>
                <pre> Vertical Diff : 
            {pivotStateRef.current ? (pivotCoordinates.current.y - currentCoordinates.current.y)*window.innerHeight : 0}</pre>
            </strong> */}
            {/* <strong>Hello</strong> */}
            <Carous diff={pivotStateRef.current && !canMoveCarousel ? (pivotCoordinates.current.x - currentCoordinates.current.x).toFixed(3) : 0} setCarouselIndex={setCarouselIndex}/> 
            <Tips/>
            <Tech/>
            <Footer/>
            <ModelProvider>
                <GestureDetector setPredictionData={setPredictionData}/>
                {/* <GestureDetector setPredictionData={setPredictionData}/> */}
            </ModelProvider>
        </div>
    )

}


export default Instructions;