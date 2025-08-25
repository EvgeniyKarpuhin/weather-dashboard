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
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [city, setCity] = useState("Киев");
    const [query, setQuery] = useState("");

    const API_KEY = "a059085e330fce68f911321b65962676";
    // const CITY = "Киев";

    useEffect(() => {
        async function fetchForecast() {
            setLoading(true);
            setError("");
            try {
                const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}&lang=ru`);
                if (!res.ok) throw new Error("Ошибка прогноза погоды");
                const data = await res.json();

                // const daily = data.list.filter((item: ForecastItem) => 
                // item.dt_txt.includes("12:00:00"));

                setForecast(data.list);
            } catch (e: any) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        }
        fetchForecast();
    }, [city]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setCity(query.trim());
    };

    if(loading) return <p>Загрузка прогноза погоды...</p>;
    if(error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Прогноз погоды {city} на 5 дней</h2>
            <form onSubmit={handleSubmit} className="mb-6 flex gap-2">
                <input 
                    type="text" 
                    value={query} 
                    onChange={(e) => setQuery(e.target.value)} 
                    placeholder="Введите город" 
                    className="border p-2 rounded w-64" 
                />
                <button 
                    type="submit" 
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                    Показать погоду
                </button>
            </form>
            <div className="grid gap-4 md:grid-cols-5">
                {forecast.map((item) => (
                <div key={item.dt_txt} className="bg-gray-200 p-4 rounded shadow">
                    <p className="font-medium">
                        {new Date(item.dt_txt).toLocaleDateString("ru-RU", {
                            weekday: "long",
                            day: "numeric",
                            month: "long",
                        })}
                    </p>
                    <img
                        src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                        alt={item.weather[0].description}
                        className="mx-auto" 
                    />
                    <p className="text-lg font-bold">{Math.round(item.main.temp)}°C</p>
                    <p className="capitalize">{item.weather[0].description}</p>
                </div>
                ))}
            </div>
        </div>
    );
}
    // <div>Forecast page</div>;
