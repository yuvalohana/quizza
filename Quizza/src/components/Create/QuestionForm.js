import React, { Component } from "react";
import { observable } from "mobx";
import { observer } from "mobx-react";
import '../../css/createQuizForm.css';

@observer
class QuestionForm extends Component {
    @observable questions = [];
    @observable currentQuestion = { text: '', answer1: '', answer2: '', answer3: '', answer4: '' }

    inputChange = (e) => this.currentQuestion[e.target.name] = e.target.value;

    addQuestion = () => {
        if ((this.questions.length < 10)
            && (this.currentQuestion.text)
            && (this.currentQuestion.answer1)
            && (this.currentQuestion.answer2)
            && (this.currentQuestion.answer3)
            && (this.currentQuestion.answer4)) {
            this.questions.push(this.currentQuestion)
            this.currentQuestion = { text: '', answer1: '', answer2: '', answer3: '', answer4: '' }
        }
    }

    showNewQuestionSection = () => {
        return (
            <div>
                <input className="input-question" type="text" placeholder="Question" name="text" value={this.currentQuestion.text} onChange={this.inputChange} /> <br />
                <input className="input-question" type="text" placeholder="Answer 1" name="answer1" value={this.currentQuestion.answer1} onChange={this.inputChange} /> <br />
                <input className="input-question" type="text" placeholder="Answer 2" name="answer2" value={this.currentQuestion.answer2} onChange={this.inputChange} /> <br />
                <input className="input-question" type="text" placeholder="Answer 3" name="answer3" value={this.currentQuestion.answer3} onChange={this.inputChange} /> <br />
                <input className="input-question" type="text" placeholder="Answer 4" name="answer4" value={this.currentQuestion.answer4} onChange={this.inputChange} /> <br />
                <input className="plus" type="button" value="+" onClick={this.addQuestion} />
            </div>
        )
    }

    showExistingQuestions = (showNew) => {
        return (
            <div>
                {showNew ? this.showNewQuestionSection() : <p>Sorry, no more questions are available! :(</p>}
                {this.questions.map((q, i) => (
                    <div className="question" key={i}>
                        <p>{i+1}. {q.text}</p>
                        {/* <input type="text" defaultValue={q.text} /> <br />
                        <input type="text" defaultValue={q.answer1} /> <br />
                        <input type="text" defaultValue={q.answer2} /> <br />
                        <input type="text" defaultValue={q.answer3} /> <br />
                        <input type="text" defaultValue={q.answer4} /> <br /> */}
                    </div>
                ))}
            </div>
        )
    }

    createNewQuestion = () => {
        if (this.questions.length === 10) return this.showExistingQuestions(false)
        if (this.questions.length) return this.showExistingQuestions(true)
        return this.showNewQuestionSection()
    }

    saveQuestions = () => {
        if (this.questions.length >= 5) {
            let formattedQuestions = [];
            for (let q of this.questions) {
                let question = {
                    text: q.text,
                    answers: [
                        { text: q.answer1, score: 1 },
                        { text: q.answer2, score: 2 },
                        { text: q.answer3, score: 3 },
                        { text: q.answer4, score: 4 }
                    ]
                }
                formattedQuestions.push(question)
            }
            this.props.saveQuestions(formattedQuestions)
        }
        else alert('Please enter at least 5 questions...')
    }

    render() {
        return (
            <div className="question-form">
                <h4 className="result-title">Enter questions and answers</h4>
                <p>(please note that answer #1 must always fit result type #1 and so on)</p>
                {this.createNewQuestion()}
                <input className="save-button" type="button" value="save questions" onClick={this.saveQuestions} />
            </div>
        )
    }
}

export default QuestionForm;