import { Routes, Route, Link } from "react-router-dom"; 

import Home from "./pages/Home"; 
import Forecast from "./pages/Forecast"; 
 
export default function App() {
    return ( 
            <div className="min-h-screen bg-gray-100 text-gray-900"> 
                <header className="p-4 flex justify-between items-center bg-blue-500"> 
                    <nav className="flex gap-4"> 
                        <Link className="text-lg text-yellow-300" to="/">Погода сейчас</Link> 
                        <Link className="text-lg text-amber-400" to="/forecast">Погода на ближайшие 3 дня</Link>
                    </nav> 
                </header> 
                <main className="p-4 flex justify-center mt-15"> 
                    <Routes> 
                        <Route path="/" element = {<Home />} /> 
                        <Route path="/forecast" element = {<Forecast />} /> 
                    </Routes> 
                </main> 
            </div> 
    ); 
}
