import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Link } from 'react-router-dom';
import QuizBox from './QuizBox';
import { observable, action } from "mobx";
import Quiz from '../Quiz/Quiz'
import '../../css/QuizScreen.css';
import { Redirect } from 'react-router';

@inject('store')
@observer
class QuizzesScreen extends Component {
    @observable redirect = false;
    @observable selectedQuiz = null;

    componentDidMount = () => {
        this.props.store.getQuizzes()
    }

    @action selectQuiz = (quizId) => {
        this.selectedQuiz = quizId;
        this.redirect = true;
    }

    render() {
        const quizzes = this.props.store.quizzes
        if (this.redirect) {
            return <Redirect push to={`/quiz/${this.selectedQuiz}`} />;
        }
            return (
                <div>
                    <h4 className="title-quizzes"> Our Quizzes </h4>
                    <div className='quiz-row'>
                        {quizzes ? quizzes.map((q, i) => <QuizBox selectQuiz={this.selectQuiz} key={q._id} index={i} quiz={q} />) : null}
                    </div>
                    <br></br>
                    <Link to="/create-quiz"><button type="button" className='addQuiz btn btn-secondary '> <i className='fas fa-plus'></i> add a quiz  </button></Link>
                </div>
            )
    }
}
export default QuizzesScreen;
