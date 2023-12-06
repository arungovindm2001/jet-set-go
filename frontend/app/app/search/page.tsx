import React from "react";
import SearchBar from "./components/SearchBar";
import backgroundImage from "@/public/1.jpg";

export default function SearchPage() {
  return (
    <div>
      <div
        style={{
          backgroundImage: `url(${backgroundImage.src})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          filter: "blur(1px)",
          width: "100%",
          height: "80vh",
          borderRadius: "25px",
        }}
      ></div>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 150,
          width: "80%",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <SearchBar />
      </div>
    </div>
  );
}
