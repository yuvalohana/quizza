import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import '../../css/quizzes-box.css';

@inject('store')
@observer
class BoxTest extends Component {

    startQuiz = () => this.props.selectQuiz(this.props.quiz._id)

    render() {
        return (
            <div id="about" className="page-section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-3 col-sm-6 col-xs-12">
                            <button className="quiz-box" type="button" id="buttonModal1" data-toggle="modal" data-target="#myModal1" onClick={this.startQuiz}>
                                <div className="service-item second-service">
                                    <div className="icon"></div>
                                    <div >
                                        <h2 className="box-title"> {this.props.quiz.title} </h2>
                                        <p> {this.props.quiz.desc} </p>
                                    </div>
                                </div>
                            </button >
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default BoxTest;