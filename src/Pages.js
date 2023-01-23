import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./home";
import React, {useState} from "react";
import App from "./App";
import Registration from "./SLiderX/Registration";
import ForgotPassword from "./SLiderX/ForgotPassword"
import "./Registration.css"



function Pages() {
    let [param1, setParam1] = useState("")

    function onSetParam(param) {
        setParam1(param)
    }
    return (
    <Router>
        <Routes>
            <Route path='/registration' element={<Registration/>}/>
            <Route path='/forgot' element={<ForgotPassword/>}/>
            <Route path='/' element={<Home onSetParam={onSetParam}/>}/>
            <Route path='/home' element={<App auth = {param1} />}/>
        </Routes>
    </Router>
    )
}

export default Pages;