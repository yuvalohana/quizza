import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../css/nav-bar.css';
import { observer, inject } from 'mobx-react';
import { observable, action } from "mobx";
import { Redirect } from 'react-router';

@inject('store')
@observer
class NavBar extends Component {
    @observable redirect = false;
    
    @action logout = () => {
        this.props.store.logout()
        this.redirect = true;
    }

    render() {
        if (this.redirect) {
            return <Redirect push to="/" />;
        }
        return (
            <nav className="allnavbar">
                <div className="logo">
                    <span className="leftnavbar">
                        QUIZZA
                    </span>
                    <span id="username">Hello, {this.props.store.user.userName}!</span>
                    <span className="rightnavbar">
                        <Link to="/home" className='navLinks'><i className="fas fa-home"></i><span> Home </span></Link>
                        <Link to='/' className='navLinks' onClick={this.logout}>
                        <i className="fas fa-sign-in-alt"></i><span> Logout </span>
                        </Link>
                    </span>
                </div>
            </nav>
        )
    }
}

export default NavBar;
