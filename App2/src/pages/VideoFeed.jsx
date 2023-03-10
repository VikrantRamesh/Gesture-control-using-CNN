import { useRef, useState, useEffect, useContext } from "react";
import { Hands } from "@mediapipe/hands";
import { Camera } from "@mediapipe/camera_utils";
import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils";
import { ModelContext } from "../context/ModelContext";
import * as tf from '@tensorflow/tfjs'

const HAND_CONNECTIONS = [
  [0, 1], [1, 2], [2, 3], [3, 4], // Thumb
  [0, 5], [5, 6], [6, 7], [7, 8], // Index finger
  [0, 9], [9, 10], [10, 11], [11, 12], // Middle finger
  [0, 13], [13, 14], [14, 15], [15, 16], // Ring finger
  [0, 17], [17, 18], [18, 19], [19, 20] // Little finger
];



const VideoFeed = () => {
  const videoRef = useRef();
  const canvasRef = useRef();
  const croppedCanvasRef = useRef();
  const imgRef = useRef();
  const preRef = useRef();
  const modelRef = useRef();

  const [prediction, setPrediction] = useState('None');
  const [frames, setFrames] = useState(0);
  const [iheight, setIheight] = useState(320);
  const [iwidth, setIwidth] = useState(240);
  const {getPrediction} = useContext(ModelContext);

  useEffect(() => {

    const fetchModel = async() => {
      const MODEL_URL = 'https://bitbucket.org/gesture-detection-model/gesture-detection/raw/87f4d5b96e8fa910c6afcc9c2eec149d16f95e21/tfjs-1/model.json'
      const modelFetched = await tf.loadLayersModel(MODEL_URL);
      modelRef.current = modelFetched;
    }

    async function onResults(results) {
      canvasCtx.save();
      canvasCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      canvasCtx.drawImage(results.image, 0, 0, canvasRef.current.width, canvasRef.current.height);
      // croppedContext.drawImage(results.image, 0, 0, croppedCanvas.width, croppedCanvas.height);
      // console.log(results.image);
      //const img = "asdfk";
      // let x = results.image;
    
      if (results.multiHandLandmarks) {
        for (const landmarks_ of results.multiHandLandmarks) {
          drawConnectors(canvasCtx, landmarks_, HAND_CONNECTIONS,
                         {color: '#00FF00', lineWidth: 5});
          drawLandmarks(canvasCtx, landmarks_, {color: '#FF0000', lineWidth: 2});
        }
    
        if(results.multiHandLandmarks.length){
          const landmarks = results.multiHandLandmarks[0];
          // const xMin = 0;
          // const yMin = 0;
          // const yMax = Infinity;
          // const Max = Infinity;
          // for (let i = 0; i < landmarks.length; i++) {
          //   const {x, y} = landmarks[i];
          //   if (x < xMin) {
          //     xMin = x;
          //   }
          //   if (y < yMin) {
          //     yMin = y;
          //   }
          //   if (x > xMax) {
          //     xMax = x;
          //   }
          //   if (y > yMax) {
          //     yMax = y;
          //   }
          // }
          const xMin = landmarks.reduce((min, landmark) => (landmark.x < min ? landmark.x : min), Infinity);
          const xMax = landmarks.reduce((max, landmark) => (landmark.x > max ? landmark.x : max), -Infinity);
          const yMin = landmarks.reduce((min, landmark) => (landmark.y < min ? landmark.y : min), Infinity);
          const yMax = landmarks.reduce((max, landmark) => (landmark.y > max ? landmark.y : max), -Infinity);
          const handHeight = yMax - yMin;
          const handWidth = xMax - xMin;
          
          
          
          // pre.innerText = `(xMin-handWidth*0.1 : ${(xMin-handWidth*0.1)*1000},\nyMin - handHeight * 0.1 : ${(yMin - handHeight * 0.1)*1000},\nhandWidth * 1.2 : ${(handWidth * 1.2)*1000},\nhandHeight * 1.2 : ${(handHeight * 1.2)*1000},\nhandWidth*1000 : ${handWidth*1000},\nhandHeight*1000 : ${handHeight*1000}`;
          let wid_d, ht_d;
          if(handWidth<200) wid_d = parseInt((200 - handWidth)/2)
          if(handHeight<300) ht_d = parseInt((250 - handHeight)/2)
          //console.log(ht_d)
          // console.log(results.image,
          //   xMin-wid_d, yMin-ht_d,
          //   xMax+wid_d, yMax+ht_d,
          //   handWidth * 2.5*1000,
          //   handHeight * 2*1000);

          // croppedContext.drawImage(
          //   results.image,
          //   (xMin + 0.7*handWidth)*1000,
          //   (yMin - 1.2*handHeight)*1000,
          //   handWidth * 2.5*1000,
          //   handHeight * 2*1000,
          //   0,
          //   0,
          //   190,
          //   256
          // );
          croppedContext.drawImage(
            results.image,
            (xMin)*1280- wid_d,
            (yMin)*720 - ht_d,
            (handWidth *1280 + 2*wid_d),
            (handHeight *720 + 2*ht_d),
            0,
            0,
            190,
            256
          );



          // console.log(handWidth,handHeight);
          // console.log(iheight,iwidth);

          if(handWidth>0 && handHeight>0){
              setIwidth(handWidth *1280 + 2*wid_d);
              setIheight(handHeight *720 + 2*ht_d);
          }
          const croppedImage = croppedCanvasRef.current.toDataURL();
          // console.log(croppedCanvasRef.current);
          imgRef.current.src = croppedImage;
          if(frames % 2 == 0){
            const prediction = await getPrediction(croppedCanvasRef.current, modelRef.current);
            setPrediction(prediction);
          }
          setFrames(x => x+1);

        }
      }
      
    
    
          canvasCtx.restore();
    }

    fetchModel();

    const canvasCtx = canvasRef.current.getContext('2d');
    const croppedContext = croppedCanvasRef.current.getContext("2d");
    // console.log(modelConfig)


    const hands = new Hands({locateFile: (file) => {
      return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
    }});
    hands.setOptions({
      maxNumHands: 1,
      modelComplexity: 1,
      handedness: 'RIGHT',
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5
    });
    hands.onResults(onResults);
    
    const camera = new Camera(videoRef.current, {
      onFrame: async () => {
        await hands.send({image: videoRef.current});
      },
      width: 1280,
      height: 720
    });
    camera.start();
   
  }, []);

  return (
    <>
      <div className="container">
        <video ref={videoRef} className="input_video"></video>
        <canvas ref={canvasRef} className="output_canvas" width="1280px" height="720px" ></canvas>
        <canvas ref = {croppedCanvasRef} className="cropped_canvas" height={'380'} width={'256'}></canvas>
        <pre ref={preRef} id="landmarks">{prediction}</pre>
        <img ref = {imgRef} className="cropped-img" alt="cropped-img"/>
    </div>
    </>
  );
};

export default VideoFeed;