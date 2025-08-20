import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"; 
import { useTheme } from "./context/ThemeContext"; 
import Home from "./pages/Home"; 
import Forecast from "./pages/Forecast"; 

function Layout() { const { theme, toggleTheme } = useTheme(); 

return ( 
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white"> 
        <header className="p-4 flex justify-between items-center bg-blue-500 dark:bg-blue-700"> 
            <nav className="flex gap-4"> 
                <Link to="/">Home</Link> 
                <Link to="/forecast">Forecast</Link> 
            </nav> 
            <button className="px-2 py-1 bg-gray-200 dark:bg-gray-800 rounded" 
                    onClick = {toggleTheme}> 
                    {theme === "dark" ? "Light" : "Dark"} Mode 
            </button> 
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

export default function App() { return ( 
    <Layout /> 
); }