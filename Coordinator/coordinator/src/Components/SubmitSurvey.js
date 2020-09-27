import React from 'react';
import '../App.css';
import axios from "axios";
import Nav from "./Nav";


class SubmitSurvey extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "prompt": '',
            "option1": '',
            "option2": '',
            "option3": '',
            "optionSelected": ''
        };
        this.createSurvey = this.submitSurvey.bind(this) // This is for the onchange method.
    }

    componentDidMount() {
        const wholeSurveyUrl = window.location.href.toString();
        const splitAtColon = wholeSurveyUrl.split(/[\s:]+/);

        let request = {
            _id: splitAtColon[splitAtColon.length - 1].toString() // last segment of the url that contains the <survey-id>
        }


        axios.post('http://localhost:3000/users/getSurvey', request)
            .then(resp => {
                this.setState({
                    prompt: resp.data.prompt,
                    option1: resp.data.option1,
                    option2: resp.data.option2,
                    option3: resp.data.option3
                }) // replace with link to survey
                console.log(resp)
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        return (
            <div>
                <Nav fromPage="Submissions"/>
                <div>
                    <h1>Submit Survey</h1>
                    <h2>Prompt: {this.state.prompt}</h2>

                    <form onSubmit={(e) => this.submitSurvey(e)}>
                        <fieldset className="form-group">
                            <div className="row">
                                <div className="col-sm-10">
                                    <div onChange={ event => this.setState({optionSelected: event.target.value})}>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="gridRadios"
                                               id="gridRadios1" value="option1" checked/>
                                            <label className="form-check-label" htmlFor="gridRadios1">
                                                {this.state.option1}
                                            </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="gridRadios"
                                               id="gridRadios2" value="option2"/>
                                            <label className="form-check-label" htmlFor="gridRadios2">
                                                {this.state.option2}
                                            </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="gridRadios"
                                               id="gridRadios3" value="option3"/>
                                        <label className="form-check-label" htmlFor="gridRadios3">
                                            {this.state.option3}
                                        </label>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                        <div className="form-group row">
                            <div className="col-sm-10">
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

    submitSurvey(e) {
        e.preventDefault()

        console.log(this.state.optionSelected)

        let request = {
            prompt: this.state.prompt,
            optionSelected: this.state.optionSelected
        }

        console.log(request)
        // Submit Survey
        axios.post('http://localhost:3000/users/submitsurvey', request)
            .then(resp => {
                alert('Your Response has been recorded')
            })
            .catch(err => {
                console.log(err);
            })
    }
}

// Component did mount, do an axios query to surveys table and findOne survey with the id from the URL.
// after you get the data, fill in the component with it. look up the React off. documentation for the component did mount stuff.
// then submit the survey, THIS DOES NEED TO GO TO A NEW DB COLLECTION, but have the id of the survey.

// Submit survey can help
export default SubmitSurvey;
