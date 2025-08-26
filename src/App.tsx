import { Routes, Route, Link } from "react-router-dom"; 

import Home from "./pages/Home"; 
import Forecast from "./pages/Forecast"; 
 
export default function App() {
    return ( 
        
            <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white"> 
                <header className="p-4 flex justify-between items-center bg-blue-500 dark:bg-blue-700"> 
                    <nav className="flex gap-4"> 
                        <Link to="/">Погода сейчас</Link> 
                        <Link to="/forecast">Погода на ближайшие 5 дней</Link> 
                    </nav> 
                </header> 
                <main className="p-4"> 
                    <Routes> 
                        <Route path="/" element = {<Home />} /> 
                        <Route path="/forecast" element = {<Forecast />} /> 
                    </Routes> 
                </main> 
            </div> 
        
        
    ); 
}
