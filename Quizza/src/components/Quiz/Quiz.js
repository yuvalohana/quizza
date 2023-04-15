import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { observable, action } from "mobx";
import Questions from './Questions';
import Result from '../Results/Result';
import '../../css/quiz.css';
import { Link } from 'react-router-dom';

@inject('store')
@observer
class Quiz extends Component {

    @observable userAnswers = [];
    @observable finalResult = null;

    @action addAnswer = (answer) => this.userAnswers.push(answer)

    @action calcFinalResult = async () => {
        let greatestOccurring = { val: this.userAnswers[0], occ: 0 };

        for (let i = 0; i < this.userAnswers.length; i++) {
            let count = 1;
            for (let j = i + 1; j < this.userAnswers.length; j++) if (this.userAnswers[j] === this.userAnswers[i]) count++;
            if (count > greatestOccurring.occ) greatestOccurring = { val: this.userAnswers[i], occ: count }
        }

        this.finalResult = greatestOccurring.val;
        let result = this.props.store.quiz.results[this.finalResult - 1]
        await this.props.store.saveUserResults(result.score)
    }

    getResult = () => this.props.store.quiz.results[this.finalResult - 1]

    componentDidMount() {
        let quizID = this.props.match.params.id
        this.props.store.getCurrentQuizz(quizID)
    }

    showQuiz(quiz) {
        return (
            <div className="quiz">
                <h3 className='quizResultTitle ' id="quizResultTitle">{quiz.title}</h3>
                <br />
                {this.finalResult ? <Result result={this.getResult} /> : <Questions addAnswer={this.addAnswer} endQuiz={this.calcFinalResult} />}
            </div>
        )
    }

    render() {
        const quiz = this.props.store.quiz
        return (<div>
            <Link to="/quiz"><div className="BackButton"> Back to all quizzes</div></Link>
            <div> {quiz ? this.showQuiz(quiz) : null}</div>
        </div>
        )
    }
}

export default Quiz;