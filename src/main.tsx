import ReactDom from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { ThemeProvider } from "./context/ThemeContext";

ReactDom.createRoot(document.getElementById("root")!).render(
    <ThemeProvider>
        <BrowserRouter basename="/weather-dashboard">
            <App />
        </BrowserRouter>
    </ThemeProvider>
)