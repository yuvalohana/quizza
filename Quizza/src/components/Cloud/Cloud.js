import React, { Component } from 'react';
import { observer, inject } from "mobx-react";
import { observable } from "mobx";
import WordCloud from 'wordcloud';
import '../../css/cloud.css';
@inject('store')
@observer
class Cloud extends Component {
    @observable showCloud = true;
    @observable gameStarted = false;
    @observable gueesed = false;
    @observable wordInput = "";
    @observable cloudCategories = [];
    db = [];
    selectedCategories = [];
    selectedQ = '';
    componentDidMount() {
        fetch("https://talaikis.com/api/quotes/").then(res => res.json()).then(json => {
            this.db = json;
            console.log(this.db)
            this.getCategories()
        })
    }
    getCategories = () => {
        for (let i = 0; i < 20; i++) {
            let size = Math.floor(Math.random() * 5 + 5);
            this.selectedCategories.push({ "cat": this.db[i]["cat"], "size": size })
        }
    }
    inputChange = (e) => {
        this.wordInput = e.target.value
        console.log(this.wordInput)
    }
    startGame = () => {
        const cat = this.selectedCategories
        for (let i in cat) {
            this.cloudCategories.push([cat[i]["cat"], cat[i]["size"]])
        }
        console.log(this.cloudCategories)
        WordCloud(document.getElementById("mc"),
            {
                list: this.cloudCategories,
                weightFactor: 5,
                fontFamily: 'Times, serif',
                rotationSteps: 2,
                backgroundColor: '#ffe0e0',
            })
        setTimeout(() => {
            this.showCloud = false;
            this.gameStarted = true;
        }, 3000);
    }
    printCloudGame = () => {
        if (this.gameStarted) {
            return (
                <div>
                    <p>which word do you remember ?</p>
                    <input type="text" name="wordInput" value={this.wordInput} onChange={this.inputChange} className="answer-input" />
                    <input type="button" className="guess-button" value="guess" onClick={this.checkWord} />
                </div>
            )
        }
        else return null;
    }
    checkWord = () => {
        let cat = this.selectedCategories
        for (let i in cat) {
            if (this.wordInput === cat[i]["cat"]) {
                this.gueesed = true;
            } else console.log("try")
        }
    }
    printQuote = () => {
        let db = this.db
        for (let i in db) {
            if (this.gueesed) {
                this.selectedQ = db[i]["quote"] + ' - ' + db[i]["author"];
                return <p>{db[i]["quote"]}<br />-{db[i]["author"]}</p>
            }
        }
    }
    tweetReady = () => {
        let tweet = '';
        let titleForTweet = this.selectedQ.replace(/<(?:.|\n)*?>/gm, '');
        tweet = encodeURIComponent(titleForTweet)
        window.open("https://twitter.com/intent/tweet?text=" + tweet, "_blank")
    }
    render() {
        return (
            <div>
                <div>
                    <h1 className="cloud-title">Cloud Game</h1>
                    <h2 className="cloud-desc">What quote best fits you?
                       <br />
                        Start the game to find out!
                   </h2>
                    {this.showCloud ? <input type="button" name="start-button" onClick={this.startGame} value="Start Game!" /> : null}
                    <br />
                    {this.showCloud ? <canvas className="cloud" id="mc" ref="my-canvas"></canvas> : null}
                </div>
                {this.printCloudGame()}
                {this.gueesed ? this.printQuote() : null}
                <i className="fab fa-twitter share-btn" id="twitter" onClick={this.tweetReady}></i>
            </div>
        )
    }
}
export default Cloud;
/*{ "word": "love", "size": 5 },
        { "word": "health", "size": 6 },
        { "word": "Friendship", "size": 7 },
        { "word": "food", "size": 8 },
        { "word": "experience", "size": 9 },
        { "word": "life", "size": 9 },
        { "word": "travel", "size": 8 },
        { "word": "sports", "size": 7 },
        { "word": "romance", "size": 6 },
        { "word": "funny", "size": 5 },
        { "word": "fear", "size": 5 },
        { "word": "respect", "size": 6 },
        { "word": "money", "size": 7 },
        { "word": "happiness", "size": 8 },
        { "word": "business", "size": 9 },
        { "word": "family", "size": 9 },
        { "word": "future", "size": 8 },
        { "word": "religion", "size": 7 },
        { "word": "anger", "size": 6 },
        { "word": "learning", "size": 5 } 
        */