import { useEffect, useState } from "react";

interface ForecastItem {
    dt_txt: string;
    main: {
        temp: number;
    };
    weather: {
        description: string;
        icon: string;
    }[];
}

export default function Forecast() {
    const [forecast, setForecast] = useState<ForecastItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const API_KEY = "a059085e330fce68f911321b65962676";
    const CITY = "Одесса";

    useEffect(() => {
        async function fetchForecast() {
            try {
                const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${CITY}&units=metric&appid=${API_KEY}&lang=ru`);
                if (!res.ok) throw new Error("Ошибка прогноза погоды");
                const data = await res.json();

                const daily = data.list.filter((item: ForecastItem) => 
                item.dt_txt.includes("12:00:00"));

                setForecast(daily);
            } catch (e: any) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        }
        fetchForecast();
    }, []);

    if(loading) return <p>Загрузка прогноза погоды...</p>;
    if(error) return <p className="text-red-500">{error}</p>;

    return (
        <div>
            <h2>Прогноз погоды {CITY} на 5 дней</h2>
            <div className="grid gap-4 md:grid-cols-5">
                {forecast.map((day) => (
                <div key={day.dt_txt} className="bg-gray-200 p-4 rounded shadow">
                    <p>{new Date(day.dt_txt).toLocaleDateString("ru-RU", {
                        weekday: "long",
                        day: "numeric",
                        month: "long",})}
                    </p>
                    <img
                        src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                        alt={day.weather[0].description} />
                    <p className="text-lg">{Math.round(day.main.temp)}°C</p>
                    <p className="capitalize">{day.weather[0].description}</p>
                </div>
                ))}
            </div>
        </div>
    );
}
    // <div>Forecast page</div>;
