import React, {useRef} from 'react';
import ReactDOM from 'react-dom/client';
import Crous from './Carousel.js';
import reportWebVitals from './reportWebVitals';
import Navbar from './navbar.js';
import App from './App';
import Tips from './tips.js';
import Tech from './tech.js';
import Footer from './footer.js';
import './index.css';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Navbar/>
    <Crous/> 
    <Tips/>
    <Tech/>
    <Footer/>
  </React.StrictMode>
);

reportWebVitals();
