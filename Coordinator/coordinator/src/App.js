import React from 'react';
import './App.css';
import ViewSubmissions from "./Components/ViewSubmissions";
import CreateSurvey from "./Components/CreateSurvey";
import SubmitSurvey from "./Components/SubmitSurvey";
import Login from "./Components/Login";
import ProtectedRoute from "./Components/ProtectedRoute";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Register from "./Components/Register";


function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Switch>
                    <Route path="/" exact component={Login}/>
                    <Route path="/register" component={Register}/>
                    <ProtectedRoute path="/createsurvey" component={CreateSurvey}/>
                    <ProtectedRoute path="/viewsubmissions" component={ViewSubmissions}/>
                    <Route path="/submitsurvey/:id" component={SubmitSurvey}/>
                </Switch>

            </div>
        </BrowserRouter>
    );
}


export default App;
