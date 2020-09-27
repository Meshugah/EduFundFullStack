import React from 'react';
import '../App.css';
import axios from "axios";
import Nav from "./Nav";
import Popup from "reactjs-popup";


class CreateSurvey extends React.Component {
    constructor(props) {
        super(props);
        this.state = {buttonValue: "disabled"};
        this.createSurvey = this.createSurvey.bind(this) // this is for the onchange method. do an onclick copy later maybe
    };


    render() {
        return (
            <div>
                <Nav/>
                <div>
                    <h1>Create Survey</h1>
                    <div class="container">
                        <form onSubmit={(e) => this.createSurvey(e)}>
                            <div className="form-group row">
                                <label htmlFor="inputPrompt" className="col-sm-2 col-form-label">Prompt</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" id="inputPrompt"
                                           placeholder="Survey Question, ex: What's your favorite color?"/>
                                </div>
                            </div>
                            <fieldset className="form-group">
                                <div class="row">
                                    <legend className="col-form-label col-sm-2 pt-0">Options</legend>
                                    <div class="d-flex w-50 justify-content-between">
                                        <div className="form-text col-sm-1">
                                            <div>
                                                <input type="text" id="optionPrompt1"
                                                       placeholder="Option 1"/>
                                            </div>
                                        </div>
                                        <div className="form-text col-sm-1">
                                            <div>
                                                <input type="text" id="optionPrompt2"
                                                       placeholder="Option 2"/>
                                            </div>
                                        </div>
                                        <div className="form-text col-sm-1">
                                            <div>
                                                <input type="text" id="optionPrompt3"
                                                       placeholder="Option 3"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </fieldset>
                            <div className="form-group row">
                                <div className="col-sm-10">
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                    <Popup trigger={
                                        <button className="btn btn-primary"
                                                disabled={this.state.buttonValue === "disabled"}>
                                            {this.state.buttonValue}
                                        </button>}>
                                        <div>Copied link</div>
                                    </Popup>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

    createSurvey(e) {
        e.preventDefault()
        let request = {
            prompt: document.getElementById('inputPrompt').value,
            option1: document.getElementById('optionPrompt1').value,
            option2: document.getElementById('optionPrompt2').value,
            option3: document.getElementById('optionPrompt3').value
        }

        let config = {
            headers: {
                "authToken": localStorage.jwt
            }
        }

        axios.post('http://localhost:3000/users/createsurvey', request, config)
            .then(resp => {
                this.setState({buttonValue: resp.data}) // replace with link to survey
                console.log(resp)
            })


            .catch(err => {
                console.log(err);
            })
    }

}

export default CreateSurvey;
