import { createContext, useState } from "react";
import * as tf from "@tensorflow/tfjs"

export const ModelContext = createContext();
export const gestures = ['Index', 'Left Click', 'Palm', 'Rock']

const ModelProvider = ({ children }) => {
  const [modelConfig, setModelConfig] = useState({
    isLoaded: false,
    model: null,
  });


  const updateModelConfig = (config) => {
    console.log(config);
    setModelConfig((prevState) => {
      return { ...prevState, ...config };
    });
    console.log(config);
  };

  const loadModel = async() => {
    const MODEL_URL = 'https://bitbucket.org/gesture-detection-model/gesture-detection/raw/87f4d5b96e8fa910c6afcc9c2eec149d16f95e21/tfjs-1/model.json'
    const model = await tf.loadLayersModel(MODEL_URL);
    updateModelConfig({isLoaded : true, model: model});
  }

  const getPrediction = async(imageSrc, model) => {
    // console.log("Hello")
    // console.log(model);
    
    if (!model) {
      return null;
    }
    // console.log("World")


    // Load the image from the provided image source.
    let img = await tf.browser.fromPixels(imageSrc);
    // console.log(img.shape);
    // console.log(img);

    // Flip the image
    let flipped = tf.image.flipLeftRight(img.expandDims(0).toFloat());
    flipped = tf.squeeze(flipped);
    

    // Convert the image to grayscale.
    const grayscale = flipped.mean(2).toFloat();

    

  
    let dim = grayscale.expandDims(2);
    dim = dim.expandDims(0)

    // Resize the grayscale image to (32, 32).
    const resized = tf.image.resizeBilinear(dim, [32, 32]);




    return new Promise((resolve, reject) => {
      model.predict(resized)
      .data()
      .then(predictions => {
        const prediction = gestures[tf.argMax(predictions).dataSync()];
        // console.log(tf.argMax(predictions).dataSync(), prediction);
        resolve(prediction);
      })
      .catch(error => {
        console.error(error);
        reject(error);
      });
    })

  }

  const modelProperties = {
    updateModelConfig: updateModelConfig,
    modelConfig: modelConfig,
    getPrediction: getPrediction,
    loadModel: loadModel
  };


  return (
    <ModelContext.Provider value={modelProperties}>
      {children}
    </ModelContext.Provider>
  );
};

export default ModelProvider;
