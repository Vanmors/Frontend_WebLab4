import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./home";
import React from "react";
import App from "./App";



function Pages() {
    let callback
    return (
    <Router>
        <Routes>
            <Route path='/' element={<Home parentCallback={callback}/>}/>
            <Route path='/home' element={<App number = {callback}/>}/>
        </Routes>
    </Router>
    )
}

export default Pages;