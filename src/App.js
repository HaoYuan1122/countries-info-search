import React from "react";
import HomePage from "./components/HomePage/HomePage";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import CountryDetail from "./components/CountryDetail/CountryDetail";

function App() {
  return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<HomePage/>}/>
                <Route path='/:name' element={<CountryDetail/>}/>
            </Routes>
        </BrowserRouter>
    
  );
}

export default App;
