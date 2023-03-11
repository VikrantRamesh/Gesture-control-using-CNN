import React, {useRef} from 'react';
import ReactDOM from 'react-dom/client';
import Crous from './Components/Carousel.jsx';
import reportWebVitals from './reportWebVitals';
import Navbar from './Components/navbar.jsx';
import App from './Components/App.jsx';
import Tips from './Components/tips.jsx';
import Tech from './Components/tech.jsx';
import Footer from './Components/footer.jsx';
import VideoFeed from './Components/Videofeed.jsx';
import ModelProvider from './context/ModelContext'
import './styles/index.css';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
   
    <Navbar/>

    <Crous/> 
    <Tips/>
    <Tech/>
    <Footer/>
    <ModelProvider>
        <VideoFeed/>
    </ModelProvider>
  </React.StrictMode>

);

reportWebVitals();
