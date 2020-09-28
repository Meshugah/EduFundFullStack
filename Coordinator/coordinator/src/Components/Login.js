import React from 'react';
import '../App.css';
import axios from "axios";
import Nav from "./Nav";
import {useHistory} from 'react-router-dom';
import auth from "../auth";


function Login(props) {
    let history = useHistory();

    const login = (e) => {
        e.preventDefault()
        let request = {
            email: document.getElementById('exampleInputEmail1').value,
            password: document.getElementById('exampleInputPassword1').value
        }
        axios.post('http://localhost:3000/auth/login', request)
            .then(response => {
                // stores jwt
                auth.login(response.data)

                if (auth.isAuthenticated(response.data)) {
                    let path = `/createsurvey`;
                    history.push(path);
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    const redirectToRegisterPage = (e) => {
        let path = `/register`;
        history.push(path);
    }


    return (
        <div>
            <Nav fromPage="Login"/>
            <div className="container">
                <form onSubmit={(e) => login(e, props)}>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1"
                               aria-describedby="emailHelp"/>
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone
                            else.</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1"/>
                    </div>

                    <button type="submit" className="btn btn-primary">Sign In</button>
                </form>
                <button className="btn btn-primary" onClick={redirectToRegisterPage}>Register</button>
            </div>
        </div>
    );
}


export default Login;
