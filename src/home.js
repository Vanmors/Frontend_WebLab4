import React, {useState} from 'react';
import Nav from 'react-bootstrap/Nav';
import NavMenu from 'react-bootstrap/Navbar';
import NavLink from 'react-bootstrap/NavLink';
import {Link} from "react-router-dom";
import { redirect } from 'react-router'
import axios from "axios";
import swal from "sweetalert";


function redirectHome(){
    redirect("/home")
}



const Home = () => {

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = (e) => {
        // e.preventDefault()
        let auth = {userName, password}
        console.log(auth)

        axios.get("http://localhost:21900/login", {
            headers: {
                // "Access-Control-Allow-Headers": "Content-Type",
                // "Access-Control-Allow-Method": "GET",
                // 'Content-Type': 'application/json',
                // "Access-Control-Allow-Origin": "true",
                // "Transfer-Encoding": "chunked",
                // "Content-Type": 'application/json'
                "Content-Type": 'text/plain'
            },
            auth
        })  .then((r) => {
            if (r.status === 200) {
                redirect("/home")
            }
            else {
                swal( "Wrong password")
            }

        })
        console.log("ok")
    }
    function onPassword(e) {
        // console.log(e.target.value)
        setPassword(e.target.value)

    }
    function onUserName(e) {
        // console.log(e.target.value)
        setUserName(e.target.value)

    }
    return (
        <div>
            <h1>Welcome to my cool application</h1>
            {/*<button onClick={redirectHome}>start application</button>*/}
            <Link to='/home' > start application </Link>
            <form>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Login</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                           value={userName} onChange={onUserName}/>
                        {/*<div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>*/}
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label" >Password</label>
                    <input type="password" class="form-control" id="exampleInputPassword1" value={password} onChange={onPassword}/>
                </div>
                <div class="mb-3 form-check">
                    <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                        <label class="form-check-label" for="exampleCheck1">Check me out</label>
                </div>
                <button type="submit" class="btn btn-primary" onClick={onSubmit}>Submit</button>
            </form>
        </div>
    );
};

export default Home;