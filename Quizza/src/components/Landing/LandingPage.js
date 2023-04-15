import React, { Component } from 'react';
import '../../css/landing.css';
import { observable, action } from "mobx";
import { observer, inject } from 'mobx-react';
import { Redirect } from 'react-router';
import Bubbels from '../General/bubbles'

@inject('store')
@observer
class LandingPage extends Component {
    @observable userName = '';
    @observable redirect = false;

    @action inputChange = (e) => this.userName = e.target.value;

    login = async () => {
        if (this.userName) {
            await this.props.store.addUser(this.userName)
            this.redirect = true;
        }
        else alert("Please enter a username :)")
    }

    render() {
        if (this.redirect) {
            return <Redirect push to="/home" />;
        }
        return (
            <div className="container">
            <Bubbels></Bubbels>
                <h1 className="first-title">QUIZZA</h1>
                <div className="input-enter">
                    <span className="username"> Enter your name and start the fun!</span><br></br><br></br><input className="input-username" type="text" name="userName" onChange={this.inputChange} value={this.userName} />
                    <br />
                    <input className="LoginButton" type="button" onClick={this.login} value="Start playing" />
                    <span></span>
                </div>
            </div>
        );
    }
}

export default LandingPage;
