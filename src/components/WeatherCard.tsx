interface WeatherData {
    city: string;
    temp: number;
    description: string;
}

export default function WeatherCard({ city, temp, description }: WeatherData) {
    return (
        <div className="border p-4 rounded shadow bg-white dark:bg-grey-800">
            <h2 className="text-x1 font-bold">{city}</h2>
            <p>{temp}°C</p>
            <p>{description}</p>
        </div>
    )
}