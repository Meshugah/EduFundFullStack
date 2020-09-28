import React from 'react';
import '../App.css';
import Nav from "./Nav";
import axios from "axios";


class ViewSubmissions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            surveys: ''
        }

    }


    componentDidMount() {
        axios.post('http://localhost:3000/users/getAllSurveys')
            .then(resp => {
                this.setState({
                    surveys: [resp.data]
                })
                // console.log(this)
            })
            .catch(err => {
                console.log(err);
            })
    }


    render() {
        var surveyCards = []
        let cards = this.state.surveys[0]
        try {
            if (cards !== undefined) {
                for (let i = 0; i <= cards.length - 1; i++) {
                    if (cards[i].submissions !== undefined) {
                        for (let j = 0; j <= cards[i].submissions.length - 1; j++) {
                            surveyCards.push(<SubmissionCard key={i + 1 * j + 1}

                                                             prompt={cards[i].prompt}
                                                             optionSelected={cards[i].submissions[j].optionSelected}
                                                             option1={cards[i].option1}
                                                             option2={cards[i].option2}
                                                             option3={cards[i].option3}
                            />)
                        }
                    }
                }
            }


        } catch (e) {
            console.error(e)
        }


        return (
            <div>
                <Nav/>
                <div>
                    <h1>View Submissions</h1>
                    {surveyCards}
                </div>
            </div>
        )
    }
}


class SubmissionCard extends React.Component {
    render() {
        return (
            <div>
                {/*do an each for this*/}
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">{this.props.prompt}</h5>
                        {/*do an each for this*/}

                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <div className="input-group-text">
                                    {/*set checked only for the option required*/}
                                    <input type="checkbox" aria-label="Checkbox for following text input" disabled
                                           checked={this.props.optionSelected === "option1"}/>
                                </div>
                            </div>
                            <input type="text" className="form-control" aria-label="Text input with checkbox"
                                   value={this.props.option1}
                                   readOnly/>
                        </div>

                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <div className="input-group-text">
                                    {/*set checked only for the option required*/}
                                    <input type="checkbox" aria-label="Checkbox for following text input" disabled
                                           checked={this.props.optionSelected === "option2"}/>
                                </div>
                            </div>
                            <input type="text" className="form-control" aria-label="Text input with checkbox"
                                   value={this.props.option2}
                                   readOnly/>
                        </div>

                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <div className="input-group-text">
                                    {/*set checked only for the option required*/}
                                    <input type="checkbox" aria-label="Checkbox for following text input" disabled
                                           checked={this.props.optionSelected === "option3"}/>
                                </div>
                            </div>
                            <input type="text" className="form-control" aria-label="Text input with checkbox"
                                   value={this.props.option2}
                                   readOnly/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ViewSubmissions;
