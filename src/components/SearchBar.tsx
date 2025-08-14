import { useState } from "react";

interface Props {
    onSearch: (city: string) => void;
}

export default function SearchBar({ onSearch }: Props) {
    const [city, setCity] = useState("");

    
}