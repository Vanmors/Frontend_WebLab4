import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./home";
import React from "react";
import App from "./App";
import Registration from "./SLiderX/Registration";
import ForgotPassword from "./SLiderX/ForgotPassword"
import "./Registration.css"



function Pages() {
    let callback
    return (
    <Router>
        <Routes>
            <Route path='/registration' element={<Registration/>}/>
            <Route path='/forgot' element={<ForgotPassword/>}/>
            <Route path='/' element={<Home parentCallback={callback}/>}/>
            <Route path='/home' element={<App number = {callback}/>}/>
        </Routes>
    </Router>
    )
}

export default Pages;