import React, {useContext, useEffect, useState} from "react";
import Navbar from "./Navibar/Navbar";
import "bootstrap/dist/css/bootstrap.min.css"
import Table from "./Table/Table";
import "./styleForInput.css"
import Canvas from "./Canvas/Canvas";
import "./Canvas/styleForCanvas.css"
import swal from 'sweetalert';
import userName from './home'
import {useNavigate} from "react-router-dom";




function App(props) {
    const [value, setValue] = useState("");
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [r, setR] = useState(0);
    const navigate = useNavigate();

    console.log(props.auth.userName)
    console.log(props.auth.password)





    useEffect(()=>{
        if (props.auth.userName !== undefined || props.auth.password !== undefined){
            window.location.reload();
            localStorage.setItem("userName", props.auth.userName)
            localStorage.setItem("password", props.auth.password)
            if (localStorage.getItem("userName") === ""){
                navigate("/")
            }
        }
        } , []
    )



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
        let hit = false;
        let point = {x, y, r, hit}
        console.log(point)

        fetch("http://localhost:21900/", {
            // mode: "no-cors",
            method: "POST",
            headers: {
                "Content-Type": 'application/json',
                // "Authorization": "Basic " + btoa("user:gg")
                "Authorization": "Basic " + btoa(localStorage.getItem("userName") + ":" + localStorage.getItem("password"))
            },
            body: JSON.stringify(point)
        }).then(r => {
            console.log(r.headers)
            if (r.status === 401){
                swal("Need Authorization", "", "error")
            }})
        console.log("ok")
    }


    function onChangeX(e) {
        // console.log(e.target.value)
        setX(e.target.value)

    }

    function logout(){
        localStorage.setItem("userName", "")
        localStorage.setItem("password", "")
        navigate("/")
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
                    <div id="canvas" className="p-3"><Canvas r = {r}/></div>
                    {/*<div id="canvas" className="p-3"><Rectangle/></div>*/}
                </div>
                <div className="col-6">
                    <div className="p-3">
                        Name: {localStorage.getItem("userName")} &nbsp;
                        <button type="submit" className="btn btn-primary" onClick={logout}>Logout</button>
                        <p></p>
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
