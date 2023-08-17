import React from "react";
import { Link } from "react-router-dom";
import "./CountryList.css";

function CountryList({ countries, searchTerm, setSearchTerm }) {
    return (
        <div className="container mt-3">
            <div className="form-group">
                <label htmlFor="search-input" className="mb-3">Search for a country below:</label>
                <input
                    id="search-input"
                    type="text"
                    placeholder="Search by country name or country code"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="form-control mb-3"
                />
            </div>
            
            <table className="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th>Country Code</th>
                        <th>Country Name</th>
                    </tr>
                </thead>
                <tbody>
                    {countries.map(country => (
                        <tr key={country.iso2}>
                            <td>
                                <Link to={`/${country.iso2}`} className="list-group-item list-group-item-action">
                                    {country.iso2}
                                </Link>
                            </td>
                            <td>
                                <Link to={`/${country.iso2}`} className="list-group-item list-group-item-action">
                                    {country.name}
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CountryList;
