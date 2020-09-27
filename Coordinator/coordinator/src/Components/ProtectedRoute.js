import React from 'react';
import {Route} from 'react-router-dom';
import auth from "../auth";


function ProtectedRoute({component: Component, ...rest}) {
    return (
        <Route {...rest} render={
            (props) => {
                if (auth.isAuthenticated()) {
                    return <Component {...props}/>
                } else {
                    //    should redirect here
                }
            }
        }/>
    )

}


export default ProtectedRoute;
