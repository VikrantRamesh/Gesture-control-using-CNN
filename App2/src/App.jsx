import './App.css'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Instructions from './pages/Instructions'
import Home from './pages/Home'
import Test from './pages/Test'
import ModelProvider from './context/ModelContext'
import VideoFeed from './pages/VideoFeed'


function App() {

    return(
      <ModelProvider>
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/instructions" element={<Instructions/>}/>
            <Route path="/test" element={<Test/>}/>
            <Route path="/videofeed" element={<VideoFeed/>}/>
        </Routes>
        </BrowserRouter>
      </ModelProvider>
    )
}

export default App
