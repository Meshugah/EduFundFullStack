import React from 'react';
import '../App.css';
import {Link} from 'react-router-dom';


function Nav(props) {
    const navStyle = {
        color: 'white'
    };

    if (props.fromPage === "Login" || props.fromPage === "Submissions" || props.fromPage === "Register") {
        return (
            <nav>
                <h3>Logo</h3>
            </nav>
        )
    } else {
        return (

            <nav>
                <div class="d-flex container align-items-center justify-content-between">
                    <div>
                        <h3>Logo</h3>
                    </div>
                    <ul class="d-flex align-items-center flex-wrap">
                        <div class="d-flex align-items-center">
                            <div class="col-md-auto">
                                <Link style={navStyle} to="/createsurvey">
                                    Create Survey
                                </Link>
                            </div>
                            <div class="col">
                                <Link style={navStyle} to="/viewsubmissions">
                                    Submissions
                                </Link>
                            </div>
                        </div>
                    </ul>
                </div>
            </nav>
        )
    }
}


export default Nav;
