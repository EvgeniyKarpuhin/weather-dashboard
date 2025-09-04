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
  const [forecast, setForecast] = useState<Record<string, ForecastItem[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [city, setCity] = useState("Киев");
  const [query, setQuery] = useState("");

  const API_KEY = "a059085e330fce68f911321b65962676";

  useEffect(() => {
    async function fetchForecast() {
      try {
        setLoading(true);
        setError("");
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}&lang=ru`
        );
        if (!res.ok) throw new Error("Ошибка прогноза погоды");
        const data = await res.json();

        const groups: Record<string, ForecastItem[]> = {};

        data.list.forEach((item: ForecastItem) => {
            const date = new Date(item.dt_txt);

            const dateKey = date.toLocaleDateString("ru-RU", {
                weekday: "long",
                day: "numeric",
                month: "long",
            });

        const today = new Date();
        if(date.getDate() === today.getDate()) return;
        if(!groups[dateKey]) groups[dateKey] = [];
        groups[dateKey].push(item);
    });

    const limited = Object.fromEntries(Object.entries(groups).slice(0, 3));

    setForecast(limited);
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
    if(query.trim()) {;
        setCity(query.trim());
    }
  };

  if (loading) return <p>Загрузка прогноза погоды...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">
        Прогноз погоды {city} на 3 дня
      </h2>
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
          className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer"
        >
          Показать погоду
        </button>
      </form>
      <div className="md:grid-cols-3 gap-4">
        {Object.entries(forecast).map(([date, items]) => (
          <div key={date} className="bg-gray-100 p-3 rounded shadow flex flex-col">
            <h3 className="ml-8 font-bold mb-3">{date}</h3>
            <div className="flex flex-row gap-2 justify-around">
              {items.map((item) => (
                <div
                  key={item.dt_txt}
                  className="bg-gradient-to-br from-blue-100 to-blue-200 
                            p-4 rounded-2xl shadow-lg w-[200px]
                            text-center transition-transform hover:scale-105"
                >
                  <p className="font-semibold text-gray-700">
                    {new Date(item.dt_txt).toLocaleTimeString("ru-RU", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  <img
                    src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                    alt={item.weather[0].description}
                    className="mx-auto w-16 h-16"
                  />
                  <p className="text-lg font-bold text-gray-900">
                    {Math.round(item.main.temp)}°C
                  </p>
                  <p className="capitalize text-sm text-gray-600">{item.weather[0].description}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
