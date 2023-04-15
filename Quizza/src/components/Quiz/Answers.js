import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { observable, action } from "mobx";

@inject("store")
@observer
class Answers extends Component {

    @observable answer = 0

    @action changeAnswer = (e) => {
        this.answer = parseInt(e.target.id)
        this.props.checkAnswer(this.answer)
    }

    render() {
        const answers = this.props.store.quiz.questions[this.props.index].answers;
        return (
            <div className="answers">
                {answers.map((answer) => {
                    return (
                        <div className="answer" key={answer._id}>
                            <input type="radio" name="answer" id={answer.score} key={answer.score} value={answer.text} onChange={this.changeAnswer} />
                            <label htmlFor={answer.score}>{answer.text}</label>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default Answers;