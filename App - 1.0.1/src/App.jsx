import './App.css'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Instructions from './pages/Instructions'

import ModelProvider from './context/ModelContext'



function App() {

    return(
      <ModelProvider>
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Instructions/>}/>
        </Routes>
        </BrowserRouter>
      </ModelProvider>
    )
}

export default App