import React, { useState, useEffect } from "react";
import Worldmap from "../WorldMap/WorldMap";
import CountryList from "../CountryList/CountryList";
import "./HomePage.css";

function HomePage() {
    const [countries, setCountries] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const COUNTRYLIST_API_KEY = process.env.REACT_APP_COUNTRYLIST_API_KEY;

    useEffect(() => {
        fetchCountryData();
    }, []);

    function fetchCountryData() {
        const apiKey = COUNTRYLIST_API_KEY;
        const apiUrl = "https://api.countrystatecity.in/v1/countries";

        const headers = new Headers();
        headers.append("X-CSCAPI-KEY", apiKey);

        const requestOptions = {
            method: "GET",
            headers: headers,
        };

        fetch(apiUrl, requestOptions)
            .then(response => response.json())
            .then(data => setCountries(data))
            .catch(error => console.log("error", error));
    }

    const filteredCountries = countries.filter(country =>
        country.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <h1 className="text-primary">Welcome to CountryInfoSearch</h1>
            <Worldmap/>
            <CountryList countries={filteredCountries} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>
    );
}

export default HomePage;



