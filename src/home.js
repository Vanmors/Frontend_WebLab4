import React from 'react';
import Nav from 'react-bootstrap/Nav';
import NavMenu from 'react-bootstrap/Navbar';
import NavLink from 'react-bootstrap/NavLink';
import {Link} from "react-router-dom";
import { redirect } from 'react-router'

function redirectHome(){
    redirect("/home")
}
const Home = () => {
    return (
        <div>
            <h1>Welcome to my cool application</h1>
            {/*<button onClick={redirectHome}>start application</button>*/}
            <Link to='/home' > start application </Link>
            <form>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Password</label>
                    <input type="password" class="form-control" id="exampleInputPassword1"/>
                </div>
                <div class="mb-3 form-check">
                    <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
                        <label class="form-check-label" for="exampleCheck1">Check me out</label>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default Home;