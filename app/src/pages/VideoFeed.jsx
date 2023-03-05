import { useRef, useState, useContext } from "react";
import Webcam from "react-webcam";
import * as tf from "@tensorflow/tfjs"
import * as handpose from "@tensorflow-models/handpose"
import { drawHand } from "../utils/drawUtilities";
import { ModelContext } from "../context/ModelContext";

const VideoFeed = () => {
  const webcamRef = useRef();
  const canvasRef = useRef();
  const imgRef = useRef();
  const [prediction, setPrediction] = useState("None");

  const {getPrediction} = useContext(ModelContext);

  const runHandPose = async () => {
    const net = await handpose.load();
    console.log("Model Loaded");

    setInterval(() => {
      detect(net);
    }, 100);
  };

  const detect = async (net) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      const hand = await net.estimateHands(video);

      if (hand.length > 0) {
        const landmarks = hand[0].landmarks;

        const ctx = canvasRef.current.getContext("2d");
        ctx.clearRect(0, 0, videoWidth, videoHeight);
        drawHand(hand, ctx);

        // Get bounding box coordinates
        const boundingBox = hand[0].boundingBox;
        const topLeft = boundingBox.topLeft;
        const bottomRight = boundingBox.bottomRight;
        const boxWidth = bottomRight[0] - topLeft[0];
        const boxHeight = bottomRight[1] - topLeft[1];

        // Get image data from canvas
        const screenshot = webcamRef.current.getScreenshot();
        // document.getElementById("handImage").src = imageSrc;

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        const cropWidth = 200;
        const cropHeight = 200;
        const x = 100;
        const y = 100;
        // const x = topLeft;
        // const y = bottomRight-boxHeight;

        canvas.width = cropWidth;
        canvas.height = cropHeight;

        const image = new Image();
        image.onload = () => {
            context.drawImage(image, x, y, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);
            // document.getElementById("handImage").src = canvas.toDataURL();
            imgRef.current.src = canvas.toDataURL();
            getPrediction(imgRef.current.src);
        };
        image.src = screenshot;
      }
    }
  };

  runHandPose();

  return (
    <>
      <Webcam
        ref={webcamRef}
        style={{
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          marginBottom: "2em",
          left: 0,
          right: 0,
          textAlign: "center",
          zindex: 9,
          width: 640,
          height: 480,
        }}
      />

      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          marginBottom: "2em",
          left: 0,
          right: 0,
          textAlign: "center",
          zindex: 9,
          width: 640,
          height: 480,
        }}
      />

      <img ref = {imgRef} id="handImage" alt="Hand" style={{position:'sticky', transform: 'translateY(-200px'}} />
      <h3 style={{position:'sticky', transform: 'translateY(-200px'}}>{prediction}</h3>
    </>
  );
};

export default VideoFeed;
