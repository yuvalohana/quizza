import React, { Component } from 'react';
import Answers from './Answers';
import { inject, observer } from 'mobx-react';
import '../../css/questiondisplay.css';

@inject("store")
@observer
class Question extends Component {

    render() {
        let question = this.props.store.quiz.questions[this.props.index]
        return (
            <div className="question">
                <h3 className="quiz-title">{question.text}</h3>
                <Answers index={this.props.index} checkAnswer={this.props.checkAnswer} />
            </div>
        )
    }
}

export default Question;