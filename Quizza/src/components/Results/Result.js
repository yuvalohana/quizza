import React, { Component } from 'react';
import Analytics from '../analytics/Analytics';
import '../../css/resultsForm.css'

class Result extends Component {

    tweetReady = () => {
        let result = this.props.result();
        let tweet = '';

        let titleForTweet = result.title.replace(/<(?:.|\n)*?>/gm, '');
        tweet = encodeURIComponent(titleForTweet)
        window.open("https://twitter.com/intent/tweet?text=" + tweet, "_blank")
    }

    facebookReady = () => {
        let result = this.props.result();
        let title = '';
        title = result.title.replace(/<(?:.|\n)*?>/gm, '');
        let url = ('https://quizza-app.herokuapp.com/')
        window.open('https://www.facebook.com/sharer/sharer.php?u=' + url + "&quote=" + title, 'facebook-popup', 'height=350,width=600');
    }

    render() {
        let result = this.props.result();
        return (
            <div>
                <h5 className='resultTitle'>{result.title}</h5>
                <p className='resultDesc'>{result.desc}</p>
                <i className="fab fa-twitter share-btn" id="twitter" onClick={this.tweetReady}></i>
                <i className="fab fa-facebook-square share-btn" id="facebook" onClick={this.facebookReady}></i>
                <br></br>
                <Analytics />
            </div >
        );
    }




}
export default Result;