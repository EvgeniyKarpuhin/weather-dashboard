import { useState } from "react";

interface Props {
    onSearch: (city: string) => void | Promise<void>;
}

export default function SearchBar({ onSearch }: Props) {
    const [city, setCity] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(city.trim()) {
            onSearch(city.trim());
            setCity("");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-3 flex gap-2">
            <input 
                type="text" 
                value={city} 
                onChange={(e) => setCity(e.target.value)} 
                placeholder="Введите город" 
                className="border p-2 rounded"
            />
            <button type="submit" className="bg-blue-500 text-white px-4 rounded cursor-pointer">
                Найти
            </button>
        </form>
    );
}