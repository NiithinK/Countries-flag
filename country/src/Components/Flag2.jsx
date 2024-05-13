import React, { useState, useEffect } from "react";

const Tile = ({ flagUrl, name, altFlag }) => {
  return (
    <div className="countryCard" style={{ // Use required class name
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      margin: "10px",
      padding: "10px",
      border: "1px solid black",
      borderRadius: "8px",
      flexDirection: "column",
      width: "200px",
    }}>
      <img src={flagUrl} alt={altFlag} style={{ width: "100px", height: "100px" }} />
      <h2>{name}</h2>
    </div>
  );
};

function Flag1() {
  const API_URL = "https://restcountries.com/v3.1/all";
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => setCountries(data))
      .catch((error) => console.error("Error fetching countries:", error));
  }, []);

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  ); // Perform case-insensitive search

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div
      style={{  height: "100vh",}}
    >
      <input
        type="text"
        placeholder="Search Countries"
        value={searchTerm}
        onChange={handleSearchChange}
        style={{
          padding: "10px",
          margin: "10px",
          fontSize: "18px",
          border: "1px solid black",
          borderRadius: "5px",
          width: "80%",
        }}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start", // Vertical alignment within the container
          flexWrap: "wrap",
        }}
      >
        {filteredCountries.length > 0 ? (
          filteredCountries.map((country) => (
            <Tile
              key={country.cca3}
              flagUrl={country.flags.png}
              name={country.name.common}
              altFlag={country.flags.alt}
            />
          ))
        ) : (
          <p style={{ textAlign: "center", margin: "20px" }}>No results found.</p>
        )}
      </div>
    </div>
  );
}

export default Flag1;
