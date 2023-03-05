import { createContext, useState } from "react";
import * as tf from "@tensorflow/tfjs"

export const ModelContext = createContext();

const ModelProvider = ({ children }) => {
  const [modelConfig, setModelConfig] = useState({
    isLoaded: false,
    model: null,
  });

  const updateModelConfig = (config) => {
    setModelConfig((prevState) => {
      return { ...prevState, ...config };
    });
  };

  const getPrediction = async(imageSrc) => {
    if(!modelConfig.model) return null;
    // Load the image from the provided image source.
    const img = await tf.browser.fromPixels(imageSrc);

    // Convert the image to grayscale.
    const grayscale = img.mean(2);

    // Resize the grayscale image to (32, 32).
    const resized = tf.image.resizeBilinear(grayscale, [32, 32]);

    // Add an extra dimension to represent the single color channel.
    const final = resized.expandDims(2);

    // Normalize the pixel values to be between 0 and 1.
    const normalized = final.div(255);

    const predictions = await modelConfig.model.predict().dataSync()[0];
    console.log(predictions)
    return predictions;

  }

  const modelProperties = {
    updateModelConfig: updateModelConfig,
    modelConfig: modelConfig,
    getPrediction: getPrediction
  };

  console.log(modelProperties)

  return (
    <ModelContext.Provider value={modelProperties}>
      {children}
    </ModelContext.Provider>
  );
};

export default ModelProvider;
