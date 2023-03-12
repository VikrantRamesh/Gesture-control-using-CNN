import logo from '../assets/logo.svg';
import '../styles/App.css';
import Webcam from 'react-webcam';
import * as tf from "@tensorflow/tfjs";
import React, { useRef, useCallback } from 'react';
import * as mp from "@mediapipe/hands";



function App(batched) {

  // Define a reference to the webcam component
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  function drawLandmarks(landmarks) {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0);
    for (let i = 0; i < landmarks.length; i++) {
      const x = landmarks[i][0];
      const y = landmarks[i][1];
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, 2 * Math.PI);
      ctx.fillStyle = 'red';
      ctx.fill();
    }
  }
 
  // Define a callback function to handle the captured video stream
  const handleCapture = useCallback(
    () => {
      
      if(typeof webcamRef.current !== 'undefined' && webcamRef.current !== null && webcamRef.current.video.readyState === 4){
        const video = webcamRef.current.video;

        predict(video);

        //video = tf.image.flipLeftRight(video);
        
        // const [min, max] = [tf.min(resized),tf.max(resized)];
        // const normalizedTensor = resized.sub(min).div(max.sub(min));

        // const canvas = canvasRef.current;
        // const ctx = canvas.getContext('2d');
        // tf.browser.toPixels(normalizedTensor, canvas).then(() => {
        //   ctx.drawImage(normalizedTensor, 0, 0);
        // });
        
      } 
    },
    [webcamRef]
  );

  const res_arr = ['Index', 'L', 'Palm', 'Stop'];

  async function predict(video){

    // do prediction
    const modelUrl = 'https://bitbucket.org/gesture-detection-model/gesture-detection/raw/87f4d5b96e8fa910c6afcc9c2eec149d16f95e21/tfjs-1/model.json'; 
    const handsModel = await tf.loadGraphModel('https://tfhub.dev/mediapipe/tfjs-model/handdetector/1/default/1', { fromTFHub: true });



    const mpImg = tf.browser.fromPixels(video);
    const mpImg2 = tf.image.resizeBilinear(mpImg, [256, 256]);
    const mpImg3 = mpImg2.expandDims(0);


    //const gray = tf.image.grayscale(video);
    const gray = tf.browser.fromPixels(video).mean(2).toFloat().expandDims(-1);


    //resize to (32,32)
    const resized = tf.image.resizeBilinear(gray, [32, 32]);

    const batched = resized.expandDims(0);




    // Run inference on hand image tensor
    const predictions = await handsModel.predict(mpImg3);

    const [min, max] = [tf.min(mpImg2),tf.max(mpImg2)];
    const normalizedTensor = mpImg2.sub(min).div(max.sub(min));

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    tf.browser.toPixels(normalizedTensor, canvas).then(() => {
      ctx.drawImage(normalizedTensor, 0, 0);
    });

    console.log(predictions);

    // Get the tensor of predicted hand landmarks
    const landmarks = predictions[0];
    drawLandmarks(landmarks.arraySync());
    

  

    const model = await tf.loadLayersModel(modelUrl);
  
    const pred = await model.predict(batched);
    const arr = Array.from(pred.dataSync());

    console.log(res_arr[arr.indexOf(Math.max(...arr))]);
    //ctx.drawImage(batched, 0, 0);
  }
  

  const detect = async () =>{
    //if(typeof webcamRef.current !== 'undefined' && webcamRef.current !== null && webcamRef.current.video.readyState === 4){
      const video = webcamRef.current.getScreenshot();

      //gray scale
      const gray = tf.image.grayscale(video);

      //resize to (32,32)
      const resized = tf.image.resizeBilinear(gray, [32, 32]);

      // Add an extra dimension to represent the batch size of 1
      const batched = resized.expandDims(0);

      predict(batched);

      
    //}
    
  }
  return (
    <div className="App">
      <header className="App-header">
        <Webcam 
        ref = {webcamRef}
        //style={{position: 'absolute', marginLeft:'auto', marginRight:'auto',left:0, right:0, textAlign: 'center', height: 720, width:1080}} 
        syyle = {{height:240,width:480}}
        screenshotFormat="image/jpeg"/>
        <button onClick={handleCapture}>Capture</button> 

        <canvas 
        ref= {canvasRef}
        />
      </header>
    </div>
  );
}

export default App;
