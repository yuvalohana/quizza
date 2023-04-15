import React, { Component } from "react";
import Question from './Question';
import { observer, inject } from "mobx-react";
import { observable, action } from 'mobx'
import '../../css/questiondisplay.css';

@inject("store")
@observer
class Questions extends Component {
    @observable index = 0
    @observable answer = 0


    checkAnswer = (answer) => {
        if (answer) this.answer = answer
    }

    @action nextquestion = () => {
        if (this.answer) {
            let length = this.props.store.quiz.questions.length
            if (this.index < length - 1) {
                this.props.addAnswer(this.answer)
                this.answer = 0
                this.index++
            }
            else {
                this.props.addAnswer(this.answer)
                this.props.endQuiz()
            }
        }
        else {
            alert("Please choose a answer to continue")
        }

    }
    render() {
        let qIndex = this.index+1;
        let length = this.props.store.quiz.questions.length        
        return (
            <div className="Questions">
                <Question index={this.index} key={this.index} checkAnswer={this.checkAnswer} />
            <span className="onquestion">{qIndex}/{length}</span>
                <form>
                    <span><input type="button" className="next-button" value="next" onClick={this.nextquestion} /></span>
                </form>
            </div>
        )
    }
}

export default Questions;