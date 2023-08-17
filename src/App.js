import React from "react";
import HomePage from "./components/HomePage/HomePage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import CountryDetail from "./components/CountryDetail/CountryDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/"/>}/>
        <Route path="/countries-info-search" element={<HomePage />} />
        <Route path="/:name" element={<CountryDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
