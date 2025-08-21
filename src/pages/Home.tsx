import { useState } from "react";
import axios from "axios";
import WeatherCard from "../components/WeatherCard";
import SearchBar from "../components/SearchBar";

interface WeatherData {
    name: string;
    main: { temp: number };
    weather: { description: string }[];
}

export default function Home() {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [error, setError] = useState("");

    const fetchWeather = async(city: string) => {
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
            <SearchBar onSearch={fetchWeather} />

            {error && <p className="text-red-500">{error}</p>}

            {weather && <WeatherCard data={weather}/>}
        </div>
    );
}