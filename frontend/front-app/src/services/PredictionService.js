import axios from 'axios';

export default class PredictionService {
    constructor(email){
        this.email = email
    }

    async makePrediction(){
        const response = await axios.post('http://localhost:3000/prediction', {email:this.email});
    }

}
