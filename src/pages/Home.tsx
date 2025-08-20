import { useState } from "react";
import axios from "axios";

interface WeatherData {
    name: string;
    main: { temp: number };
    weather: { description: string }[];
}

export default function Home() {
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [error, setError] = useState("");

    const fetchWeather = async() => {
        try {
            const res = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a059085e330fce68f911321b65962676&units=metric&lang=ru`
            );

            setWeather(res.data);
            setError("");
        } catch {
            setWeather(null);
            setError("Город не найден")
        }
    };

    return (
        <div>
            <div className="mb-4 flex gap-2">
                <input 
                    type="text" 
                    value={city} 
                    onChange={(e) => setCity(e.target.value)} 
                    placeholder="Введите город" 
                    className="border rounded px-2 py-1" 
                />
                <button onClick={fetchWeather} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                    Показать погоду
                </button> 
            </div>

            {error && <p className="text-red-500">{error}</p>}

            {weather && (
                <div className="p-4 rounded shadow-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white max-w-sm">
                    <h2 className="text-xl font-bold mb-2">{weather.name}</h2>
                    <p className="mb-1">Температура: {Math.round(weather.main.temp)}°C</p>
                    <p>Состояние: {weather.weather[0].description}</p>
                </div>
            )}
        </div>
    );
}