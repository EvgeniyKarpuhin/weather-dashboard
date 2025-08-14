import { useState } from "react";
import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/WeatherCard";

export default function Home() {
    const [weather, setWeather] = useState<any>(null);

    const fetchWeather = async(city: string) => {
        https://api.openweathermap.org/data/2.5/weather?q={city}&appid={a059085e330fce68f911321b65962676}&units=metric;
        setWeather({ city, temp: 20, description: "Sunny" });
    };

    return (
        <div>
            <SearchBar onSearch = {fetchWeather} />
            {weather && <WeatherCard {...weather} />}
        </div>
    );
}