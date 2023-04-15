import React, { Component } from "react";
import { observer } from "mobx-react";
import { observable, action } from "mobx";
import '../../css/horoscope.css';

@observer
class Horoscope extends Component {
    @observable horoscopeData = null

    @observable userSign = "Aries"

    @action changeInput = (e) => this.userSign=e.target.value;
    
    @action getMyHoroscope = () => {
        const URL = 'https://aztro.sameerkumar.website/?sign=' + this.userSign + '&day=today';
        fetch(URL, {
            method: 'POST'
        }).then(response => response.json())
            .then(json => { 
                this.horoscopeData = json;
                this.horoscopeData.sign = this.userSign;
            });
    }

    showHoroscope = () => {
        return (
            <div className=" all-horoscope">
                <h1 className="horoscope-title">{this.horoscopeData.sign}</h1><hr />
                <p>Current Date: {this.horoscopeData.current_date} <br /></p>
                <p>Date Range: {this.horoscopeData.date_range} <br /></p>
                <p>Compatibility: {this.horoscopeData.compatibility} <br /></p>
                <p>Lucky Number: {this.horoscopeData.lucky_number} <br /></p>
                <p>Color: {this.horoscopeData.color} <br /></p>
                <p>Mood: {this.horoscopeData.mood} <br /><br /></p>
                <p>Daily Horoscope: {this.horoscopeData.description} <br /></p>
            </div>
        );
    }

    render() {
        return (<div>
            <h1 id="horoscope-title">Get my horoscope</h1>
            <h2 id="horo-desc">Select your sign from the list and get your horoscope for today!</h2>
            <div className="dropdown">
                <select  className="btn btn-secondary dropdown-toggle select-button" id="list" value={this.userSign} onChange={this.changeInput}>
                    <option className="dropdown-item">Aries</option>
                    <option className="dropdown-item">Taurus</option>
                    <option className="dropdown-item">Gemini</option>
                    <option className="dropdown-item">Cancer</option>
                    <option className="dropdown-item">Leo</option>
                    <option className="dropdown-item">Virgo</option>
                    <option className="dropdown-item">Libra</option>
                    <option className="dropdown-item">Scorpio</option>
                    <option className="dropdown-item">Sagittarius</option>
                    <option className="dropdown-item">Capricorn</option>
                    <option className="dropdown-item">Aquarius</option>
                    <option className="dropdown-item">Pisces</option>
                </select>
                <input className="dropdown-toggle horoscop-button" type='button' value='Get my horoscope' onClick={this.getMyHoroscope}/>
                {this.horoscopeData ? this.showHoroscope() : null}
            </div>
            </div>
        );
    }
}

export default Horoscope;