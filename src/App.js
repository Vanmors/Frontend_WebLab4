import React, {useState} from "react";
import Navbar from "./Navibar/Navbar";
import "bootstrap/dist/css/bootstrap.min.css"
import Table from "./Table/Table";
import "./styleForInput.css"
import Canvas from "./Canvas/Canvas";
import "./Canvas/styleForCanvas.css"
import {BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';
import Home from "./home";
import axios, {post, request} from 'axios'
import swal from 'sweetalert';
import {Rectangle} from "./Canvas/TestCanvas";


function App() {
    const [value, setValue] = useState("");
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [r, setR] = useState(0);
    // function sendData() {
    //     let data = {userName: "awdaw", password: "awdawd"};
    //     window.alert("sending")
    //     fetch(`http://localhost:21900/greeting`, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(data)
    //
    //     }).then((res) => {
    //         window.alert("accept")
    //         if (res.ok) {
    //             window.alert("ok")
    //         } else {
    //             window.alert("bad")
    //         }
    //     })
    // }

    function validateInput() {
        if (y > 3 || y < -3) {
            swal("incorrect data", "", "error").then((value) => {
                swal("Data must be:",
                    `X: (-3 ... 5)
                Y: (-3 ... 3)
                Z: (-3 ... 5)`);
            });
            return false
        } else {
            return true
        }
    }

    const onSubmit = (e) => {
        // e.preventDefault()
        let point = {x, y, r}
        console.log(point)

        fetch("http://localhost:21900/", {
            method: "POST",
            headers: {
                // "Access-Control-Allow-Headers": "Content-Type",
                // "Access-Control-Allow-Method": "GET",
                // 'Content-Type': 'application/json',
                // "Access-Control-Allow-Origin": "true",
                // "Transfer-Encoding": "chunked",
                "Content-Type": 'application/json'
                // "Content-Type": 'text/plain'
            },
            body: JSON.stringify(point)
        }).then(r => console.log(r.headers))
        console.log("ok")
    }


    function onChangeX(e) {
        // console.log(e.target.value)
        setX(e.target.value)

    }

    function onChangeY(e) {
        // console.log(e.target.value)
        setY(e.target.value)
        if (y >= 3 || y <= -3) {

            swal("incorrect data", "", "error").then((value) => {
                swal("Data must be:",
                    `X: (-3 ... 5)
                Y: (-3 ... 3)
                Z: (-3 ... 5)`);
            });
            setY("")
        }
    }

    function onChangeR(e) {
        // console.log(e.target.value)
        setR(e.target.value)
    }

    return (

        <div className="App">

            <Navbar/>
            {/*<form onSubmit={(e) => onSubmit(e)}>*/}
            <div className="row g-2">
                <div className="col-6">
                    <div id="canvas" className="p-3"><Canvas/></div>
                    {/*<div id="canvas" className="p-3"><Rectangle/></div>*/}
                </div>
                <div className="col-6">
                    <div className="p-3">
                        <label htmlFor="X:">X:</label>
                        <input type="number" disabled={true} id="XInput" value={x}/>
                        <p/>
                        <input type="range" id="XRange" name="X"
                               min="-3" max="5" onChange={onChangeX} value={x}/>
                        <p/>
                        <label htmlFor="R:">Y: {value}</label>
                        <p/>
                        <input name="Y" type={"number"} value={y} onChange={onChangeY}
                               placeholder="(-3 ... 3)"
                        />

                        <p/>
                        <label htmlFor="R:">R:</label>
                        <input type="number" disabled={true} id="RInput" value={r}/>
                        <p/>
                        <input type="range" id="RRange" name="R"
                               min="-3" max="5" onChange={onChangeR} value={r}/>


                        <p/>
                        <button type="submit" className="btn btn-primary" onClick={onSubmit}
                        >Submit
                        </button>
                    </div>
                </div>
                <Table/>
            </div>
            {/*</form>*/}
        </div>

    );
}

export default App;
