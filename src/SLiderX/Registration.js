import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import swal from "sweetalert";

const Registration = () => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();


    const onSubmit = (e) => {
        // e.preventDefault()
        let auth = {userName, password}
        console.log(auth)


        fetch("http://localhost:21900/registration", {
            // mode: "no-cors",
            method: "POST",
            headers: {
                "Content-Type": 'application/json',
            },
            body: JSON.stringify(auth)
        }).then((r) => {
            console.log(r.status)
            if (r.status === 200) {
                navigate("/")
            } else {
                swal("User with this name already exists", "", "error")
            }
                    });
    }

    function onPassword(e) {
        setPassword(e.target.value)
    }

    function onUserName(e) {
        setUserName(e.target.value)
    }

    return (
        <div className="login-page">
            <div className="container h-100">
                <div className="card-wrapper">
                    <div className="card fat">
                        <div className="card-body">
                            <h4 className="card-title">Registration Page</h4>

                                <div className="form-group">
                                    <label htmlFor="email">User Name</label>
                                    <input id="username" type="text" className="form-control" minLength={5}
                                           name="userName" required value={userName} onChange={onUserName}/>
                                </div>

                                <div>
                                    <p></p>
                                    <label>Password</label>
                                    <input id="password" type="password" className="form-control" minLength={5}
                                           name="password" required value={password}
                                           onChange={onPassword}/>
                                </div>

                                <div>
                                    <a href="/forgot">
                                        Forgot Password?
                                    </a>
                                </div>
                                <p></p>
                                <button type="submit" onClick={onSubmit}
                                        className="btn btn-primary">Register
                                </button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registration;