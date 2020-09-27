import React from 'react';
import '../App.css';
import axios from "axios";
import Nav from "./Nav";
import { useHistory } from 'react-router-dom';
import auth from "../auth";



function Register(props) {
    let history = useHistory();

    const register = (e) =>  {
        e.preventDefault()
        let request = {
            email: document.getElementById('exampleInputEmail1').value,
            name: document.getElementById('exampleInputName1').value,
            password: document.getElementById('exampleInputPassword1').value,
            gender: document.getElementById('exampleInputGender1').value,
            age: document.getElementById('exampleInputAge1').value,
        }

        axios.post('http://localhost:3000/auth/register', request)
            .then(response => {
                // stores jwt
                auth.login(response.data)

                if(auth.isAuthenticated(response.data)) {
                    let path = `/createsurvey`;
                    history.push(path);
                }
            })
            .catch(err => {
                console.log(err);
            })
    }


    return (
        <div>
            <Nav fromPage="Register"/>
            <div className="container">
                <form onSubmit={(e) => register(e, props)}>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1"
                               aria-describedby="emailHelp"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputName1">Name</label>
                        <input type="text" className="form-control" id="exampleInputName1"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputGender1">Gender</label>
                        <input type="text" className="form-control" id="exampleInputGender1"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputAge1">Age</label>
                        <input type="number" className="form-control" id="exampleInputAge1"/>
                    </div>

                    <button type="submit" className="btn btn-primary">Register</button>
                </form>
            </div>
        </div>
    );
}



export default Register;
