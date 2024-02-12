import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Movies from "./Movies";
import Product from "./Product"; 

export default function Routing(){
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Movies />} />
                <Route path="/watch" element={<Product />} />
                <Route path="/movie" element={<Movies/>}/>
            </Routes>
        </Router>
    );
}
