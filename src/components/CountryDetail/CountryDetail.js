
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./CountryDetail.css"

function CountryDetail() {
    const params = useParams();
    const [countryData, setCountryData] = useState(null);
    const [isLoading, setIsloading] = useState(false)
    const [isApiAvailable, setIsApiAvailable] = useState(true);
    const COUNTRYDETAIL_API_KEY=process.env.REACT_APP_COUNTRYDETAIL_API_KEY

    useEffect(() => {
        fetchCountryData();
    }, []);

    function fetchCountryData() {
        
        const apiKey = COUNTRYDETAIL_API_KEY
        const apiUrl = `https://api.api-ninjas.com/v1/country?name=${params.name}`;
        setIsloading(true);
        setIsApiAvailable(true);
        fetch(apiUrl, {
            headers: {
                "X-Api-Key": apiKey,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data[0])
                setCountryData(data[0])
                setIsloading(false);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setIsloading(false); 
                setIsApiAvailable(false);
            });

    }

   

    function renderData() {
        if (countryData) {
            return Object.entries(countryData).map(([key, value]) => (
                <tr key={key}>
                    <td>{capitalizeFirstLetter(key.replace(/_/g, " "))}</td>
                    <td>{typeof value === 'object' ? value.name : String(value) || 'N/A'}</td>
                    <td>{getUnit(key)}</td>
                </tr>
            ))
        }
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function getUnit(key) {
        switch (key) {
            case 'co2_emissions':
                return 'g/person/year';
            case 'pop_density':
                return 'people/sq km';
            case 'employment_agriculture':
                return '%';
            case 'employment_industry':
                return '%';
            case 'employment_services':
                return '%';
            case 'exports':
                return 'millions of US Dollars (USD)';
            case 'fertility':
                return 'children/woman';
            case 'forested_area':
                return '%';
            case 'gdp':
                return 'millions of US Dollars (USD)';
            case 'gdp_growth':
                return '%';
            case 'gdp_per_capita':
                return 'US Dollars/capita';
            case 'homicide_rate':
                return 'per 100,000 people';
            case 'imports':
                return 'millions of US Dollars (USD)';
            case 'infant_mortality':
                return 'Per 1,000 infants';
            case 'internet_users':
                return '%';
            case 'life_expectancy_female':
                return 'years'
            case 'life_expectancy_male':
                return 'years'
            case 'pop_density':
                return 'People/square kilometer';
            case 'population':
                return 'thousand';
            case 'refugees':
                return 'hundred';
            case 'sex_ratio':
                return 'Males per 100 females';
            case 'surface_area':
                return 'Square kilometers';
            case 'threatened_species':
                return 'Species';
            case 'currency':
                return countryData.currency.code;
            default:
                return '----'
        }
    }


    return (
        <div className="container mt-4">
            {isLoading ? (
                <p className="loadingDetail">Loading country details...</p>
            ) : isApiAvailable ? (
                countryData ? (
                    <>
                        <h1 className="text-center">{countryData.name}</h1>
                        <table className="table table-bordered table-hover table-striped">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Value</th>
                                    <th>Unit</th>
                                </tr>
                            </thead>
                            <tbody>{renderData()}</tbody>
                        </table>
                    </>
                ) : (
                    <p className="noAvailableData">Oops, No data available for this country.</p>
                )
            ) : (
                <p>The API is not available at the moment.</p>
            )}
        </div>
    );
}

export default CountryDetail;

