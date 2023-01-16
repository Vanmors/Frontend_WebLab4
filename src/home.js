import React, {createContext, useContext, useState} from 'react';
import Nav from 'react-bootstrap/Nav';
import NavMenu from 'react-bootstrap/Navbar';
import NavLink from 'react-bootstrap/NavLink';
import {Link, useNavigate, useNavigation} from "react-router-dom";
import { redirect } from 'react-router'
import axios from "axios";
import swal from "sweetalert";



const Home = ({ parentCallback }) => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const userNameContext = createContext(userName)
    const passwordContext = createContext(password)

    parentCallback = 3
    const onSubmit = (e) => {
        // e.preventDefault()
        let auth = {userName, password}
        let pointTest = {x:0, y:0, r:0, hit:false}
        console.log(auth)

        fetch("http://localhost:21900/", {
            // mode: "no-cors",
            method: "POST",
            headers: {
                "Content-Type": 'application/json',
                "Authorization": "Basic " + btoa(userName + ":" + password)
            },
            body: JSON.stringify(pointTest)
        }).then((r) => {
            console.log(r.status)
            if (r.status === 200) {
                navigate("/home")
            } else {
                // swal("Wrong password")
                swal({
                    text: 'Wrong password, but you can search for a movie!',
                    content: "input",
                    button: {
                        text: "Search!",
                        closeModal: false,
                    },
                })
                    .then(name => {
                        if (!name) throw null;

                        return fetch(`https://itunes.apple.com/search?term=${name}&entity=movie`);
                    })
                    .then(results => {
                        return results.json();
                    })
                    .then(json => {
                        const movie = json.results[0];

                        if (!movie) {
                            return swal("No movie was found!");
                        }

                        const name = movie.trackName;
                        const imageURL = movie.artworkUrl100;

                        swal({
                            title: "Top result:",
                            text: name,
                            icon: imageURL,
                        });
                    })
                    .catch(err => {
                        if (err) {
                            swal("Oh noes!", "The AJAX request failed!", "error");
                        } else {
                            swal.stopLoading();
                            swal.close();
                        }
                    });
            }

        })
    }
    function onPassword(e) {
        setPassword(e.target.value)

    }
    function onUserName(e) {
        setUserName(e.target.value)

    }
    return (
        <div>
            <h1>Welcome to my cool application</h1>
            {/*<button onClick={redirectHome}>start application</button>*/}
            {/*<Link to='/home' > start application </Link>*/}
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