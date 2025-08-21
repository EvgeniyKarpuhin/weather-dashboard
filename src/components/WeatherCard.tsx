// import React from "react";

interface WeatherCardProps {
    data: any;
}

// interface WeatherData {
//     city: string;
//     temp: number;
//     description: string;
// }

export default function WeatherCard({ data }: WeatherCardProps) {
    if (!data) return null;
    const temp = Math.round(data.main.temp);
    const description = data.weather[0].description;

    let bgColor = "bg-gray-300";
    if(temp <= 0) {
        bgColor = "bg-blue-500";
    } else if(temp > 0 && temp < 20) {
        bgColor = "bg-green-400";
    } else if(temp >= 20 && temp < 30) {
        bgColor = "bg-orange-400";
    } else if(temp >= 30) {
        bgColor = "bg-red-500";
    }
    return (
        <div className={`${bgColor} text-white rounded-2xl shadow-lg p-6 w-80 text-center`}>
            <h2 className="text-2xl font-bold mb-2">{data.name}</h2>
            <p className="text-5xl font-extrabold mb-2">{temp}°C</p>
            <p className="capitalize text-lg">{description}</p>
        </div>
    );
}