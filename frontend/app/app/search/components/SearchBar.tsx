"use client";

import React, { useState } from "react";
import { DatePickerWithRange } from "./DatePickerWithRange";
import { useRouter } from "next/navigation";

const SearchBar = () => {
  const [fromQuery, setFromQuery] = useState("");
  const [toQuery, setToQuery] = useState("");
  const router = useRouter()

  const handleSearch = () => {
    router.push("/app/hotels")
  }

  return (
    <div className="join w-full">
      <input
        type="text"
        placeholder="From"
        value={fromQuery}
        onChange={(e) => setFromQuery(e.target.value)}
        className="input input-lg input-bordered join-item w-full dropdown"
      />
      <input
        type="text"
        placeholder="To"
        value={toQuery}
        onChange={(e) => setToQuery(e.target.value)}
        className="input input-lg input-bordered join-item w-full"
      />
      <input
        type="number"
        placeholder="Passengers"
        className="input input-lg input-bordered join-item w-[70%]"
      />
      <input
        type="number"
        placeholder="Budget"
        className="input input-lg input-bordered join-item w-[70%]"
      />
      <DatePickerWithRange className="button-lg join-item"></DatePickerWithRange>
      <button className="btn btn-lg join-item" onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
