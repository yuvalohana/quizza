import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import BoxTest from './BoxTest';

@inject('store')
@observer
class QuizBox extends Component {

    render() {
        return (
            <div className='box-link'>
                <BoxTest selectQuiz={this.props.selectQuiz} quiz={this.props.quiz} />
            </div>
        );
    }
}

export default QuizBox;

