import {useState, useEffect, useContext} from 'react';
import { ModelContext } from '../context/ModelContext';
import * as tf from '@tensorflow/tfjs'
import { Link } from 'react-router-dom';


const MODEL_URL = 'https://bitbucket.org/gesture-detection-model/gesture-detection/raw/87f4d5b96e8fa910c6afcc9c2eec149d16f95e21/tfjs-1/model.json'

const Test = () => {

    const {updateModelConfig, modelConfig} = useContext(ModelContext);

    useEffect(() => {

        const loadModel = async() => {
            const model = await tf.loadLayersModel(MODEL_URL);
            updateModelConfig({isLoaded : true, model: model})
            console.log(modelConfig.model);
        }

        loadModel();
        // console.log(modelConfig.model.summary())

    }, [])

    return(
        <>
            {modelConfig.isLoaded || <h1>Loading Model</h1>}
            {modelConfig.isLoaded && <h1>Model Loaded</h1>}
            <div>Just a page to test to model</div>
            <Link to="/instructions">Instructions page</Link>
        </>

    )

}


export default Test;