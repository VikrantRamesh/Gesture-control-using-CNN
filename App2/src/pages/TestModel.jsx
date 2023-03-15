import {useState, useEffect, useContext, useRef} from 'react';
import { ModelContext } from '../context/ModelContext';
import * as tf from '@tensorflow/tfjs'
import { Link, useNavigate } from 'react-router-dom';


const MODEL_URL = 'https://bitbucket.org/gesture-detection-model/gesture-detection/raw/87f4d5b96e8fa910c6afcc9c2eec149d16f95e21/tfjs-1/model.json'

const TestModel = () => {

    const {getPrediction} = useContext(ModelContext);
    const [prediction, setPrediction] = useState(null);
    const [predictionState, setPredictionState] = useState(false);
    const [modelState, setModelState] = useState(false);
    const modelRef = useRef();
    const imgRef = useRef();
    const inputRef = useRef();
    // const navigate = useNavigate();

    useEffect(() => {

        const loadModel = async() => {
            const model = await tf.loadLayersModel(MODEL_URL);
            modelRef.current = model;
            setModelState(true);
        }

        loadModel();
        // console.log(modelConfig.model.summary())

    }, [])

    const makePrediction = async() => {
        const image = new Image();
        image.src = imgRef.current.src;
        image.onload = async() => {
            const canvas = document.createElement('canvas');
            canvas.width = image.width;
            canvas.height = image.height;
            const canvasContext = canvas.getContext('2d');
            canvasContext.drawImage(image, 0, 0, image.width, image.height);
            const prediction = await getPrediction(canvas, modelRef.current);
            console.log(prediction);
            setPrediction(prediction);
        };
    }

    const handleImageUpload = (event) => {
        const image = event.target.files[0];

        if(image){
            const fileReader = new FileReader();
            fileReader.readAsDataURL(image);
            fileReader.addEventListener('load', async(e) => {
                const res = fileReader.result;
                const img = new Image();
                img.onload = async() => {
                    const canvas = document.createElement('canvas');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0);
                    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

                    imgRef.current.src = res;
                    setPredictionState(true);
                    
                }
                img.src = res;
            });
        }

        


    }
    


    return(
        <>
            {modelState || <h1>Loading Model</h1>}
            {modelState && <h1>Model Loaded</h1>}
            <div style={{margin: 'auto', display: 'flex', flexDirection: 'column', gap: '2em', alignItems:'center'}}>
                <div>Just a page to test to model</div>
                
                
                    <img ref={imgRef} alt="img" style={{display: 'block'}}></img>
                    {predictionState && <button type="text" onClick = {makePrediction}>Predict</button>}
                    
                <p><strong>{prediction}</strong></p>
                <input type='file' ref={inputRef} onInput={(event) => {handleImageUpload(event)}}></input>
            </div>
        </>

    )

}


export default TestModel;