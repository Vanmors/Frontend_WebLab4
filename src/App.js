import React, { useEffect, useState} from "react";
import Navbar from "./Navibar/Navbar";
import "bootstrap/dist/css/bootstrap.min.css"
import Table from "./Table/Table";
import "./styleForInput.css"
import Canvas from "./Canvas/Canvas";
import "./Canvas/styleForCanvas.css"
import swal from 'sweetalert';
import {useNavigate} from "react-router-dom";




function App(props) {
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
        }
    )


    const onSubmit = () => {
        let hit;
        if (((x * x + y * y) <= r * r && x <= 0 && y >= 0) ||
            (x - y <= r && x >= 0 && y <= 0) ||
            (2 * y <= r && x <= r && x >= 0 && y >= 0)) {
            hit = true
        }
        else {
            hit = false
        }

        let point = {x, y, r, hit}
        console.log(point)

        fetch("http://localhost:21900/", {
            method: "POST",
            headers: {
                "Content-Type": 'application/json',
                "Authorization": "Basic " + btoa(localStorage.getItem("userName") + ":" + localStorage.getItem("password"))
            },
            body: JSON.stringify(point)
        }).then(r => {
            console.log(r.headers)
            if (r.status === 401){
                swal("Need Authorization", "", "error")
                navigate("/")
            }})
        console.log("ok")
    }


    function onChangeX(e) {
        setX(e.target.value)
        console.log(x)

    }

    function logout(){
        localStorage.setItem("userName", "")
        localStorage.setItem("password", "")
        navigate("/")
    }

    function onChangeY(e) {
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
        setR(e.target.value)
    }

    return (

        <div className="App">

            <Navbar/>
            <div className="row g-2">
                <div className="col-6">
                    <div id="canvas" className="p-3"><Canvas r = {r}/></div>
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
                        <label htmlFor="R:">Y: </label>
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
        </div>

    );
}

export default App;
