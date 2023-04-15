import { observable, action } from 'mobx';
import axios from 'axios';

class QuizStore {
    @observable user = JSON.parse(localStorage.getItem('user')) || null;
    @observable quizzes = null;
    @observable quiz = null;
    @observable isLoading = true;

    @action addUser = async (userName) => {
        const newUser = await axios.get('/user/' + userName);
        this.user = newUser.data;
        localStorage.setItem('user', JSON.stringify(this.user));
    }

    @action logout = () => {
        this.user = null;
        localStorage.setItem('user', JSON.stringify(null))
    }

    @action getQuizzes = async ()=> {
        const allQuizzes = await axios.get('/quizzes');
        this.quizzes = allQuizzes.data;
    }

    @action getCurrentQuizz = async (quizID)=> { 
        const currentQuizz = await axios.get('/getquiz/' + quizID);
        this.quiz = currentQuizz.data;
    }

    @action saveQuiz = async (header, questions, results)=> {
        let newQuiz = {
            title: header.title,
            desc: header.description,
            questions: questions,
            results: results
        }
        let q = await axios.post('/quiz', newQuiz)
        console.log(q.data);
    }
    
    @action saveUserResults = async (score) => {
        let userQuiz = { qID: this.quiz._id, score: score }
        let user = await axios.post('/user/addQuiz/' + this.user._id, userQuiz)
        this.user = user.data;
    }
}

const store = new QuizStore();
export default store;