import { useState } from "react";
import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/WeatherCard";
import axios from "axios";

export default function Home() {
    const [weather, setWeather] = useState<any>(null);

    const fetchWeather = async(city: string) => {
        try {
            const apiKey = "a059085e330fce68f911321b65962676";
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
            const { data } = await axios.get(url);

            setWeather({ 
                city: data.name,
                temp: Math.round(data.main.temp),
                description: data.weather[0].description 
            });
        } catch (err) {
            console.error("Ошибка при запросе погоды", err)
        }
    };

    return (
        <div>
            <SearchBar onSearch = {fetchWeather} />
            {weather && <WeatherCard {...weather} />}
        </div>
    );
}