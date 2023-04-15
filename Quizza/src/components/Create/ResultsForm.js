import React, { Component } from "react";
import '../../css/createQuizForm.css';

class ResultsForm extends Component {
    results = { title1: '', desc1: '', title2: '', desc2: '', title3: '', desc3: '', title4: '', desc4: '', }

    saveResults = () => {
        if ((this.results.title1)
            && (this.results.desc1)
            && (this.results.title2)
            && (this.results.desc2)
            && (this.results.title3)
            && (this.results.desc3)
            && (this.results.title4)
            && (this.results.desc4)) {
            let formattedResults = [
                { score: 1, title: this.results.title1, desc: this.results.desc1 },
                { score: 2, title: this.results.title2, desc: this.results.desc2 },
                { score: 3, title: this.results.title3, desc: this.results.desc3 },
                { score: 4, title: this.results.title4, desc: this.results.desc4 }
            ];
            this.props.saveResults(formattedResults)
        } else alert("please create all the results!")
    }

    inputChange = (e) => this.results[e.target.name] = e.target.value

    render() {
        return (
            <div className="results-form">
                <h4 className="result-title">Enter the final result types:</h4>
                <div className="result-box result1">
                    <div>1</div>
                    Title: <input type="text" name="title1" placeholder="title" onChange={this.inputChange} /> <br />
                    Description: <input type="text" name="desc1" placeholder="description" onChange={this.inputChange} />
                </div>
                <div className="result-box result2">
                    <div>2</div>
                    Title: <input type="text" name="title2" placeholder="title" onChange={this.inputChange} /> <br />
                    Description: <input type="text" name="desc2" placeholder="description" onChange={this.inputChange} />
                </div>
                <div className="result-box result3">
                    <div>3</div>
                    Title: <input type="text" name="title3" placeholder="title" onChange={this.inputChange} /> <br />
                    Description: <input type="text" name="desc3" placeholder="description" onChange={this.inputChange} />
                </div>
                <div className="result-box result4">
                    <div>4</div>
                    Title: <input type="text" name="title4" placeholder="title" onChange={this.inputChange} /> <br />
                    Description: <input type="text" name="desc4" placeholder="description" onChange={this.inputChange} />
                </div>
                <br></br>
                <input className="save-button" type="button" value="save results" onClick={this.saveResults} />
            </div>
        )
    }
}

export default ResultsForm;