import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./home";
import React from "react";
import App from "./App";



function Pages() {
    return (
    <Router>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/home' element={<App/>}/>
        </Routes>
    </Router>
    )
}

export default Pages;