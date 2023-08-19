import axios from 'axios';
import {firebaseApp, auth} from '../firebase/config.js';
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';
import TokenStorage from '../utils/Token.js'

export default class PredictionService {
    constructor(email){
        this.email = email
        this.db = getFirestore(firebaseApp)
    }

    async makePrediction(){
            try {
                const response = await axios.post('http://localhost:3000/prediction', { email: this.email });
                const uid = await new TokenStorage().getToken('uid')
                const currentDate = new Date();
                const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')} ${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}:${currentDate.getSeconds().toString().padStart(2, '0')}`;
                const userDocRef = doc(this.db, 'Users', uid);

                if (response.status === 200) {
                    this.savePrediction({
                        email:this.email,
                        prediction : response.data.prediction,
                        uid:userDocRef ,
                        date: formattedDate
                    })
                    console.log('Prediction successful:', response.data);
                } else {
                    console.error('Une erreur est survenue:', response.data.error || 'Veuillez réessayer');
                }
            } catch (error) {
                console.error('Une erreur est survenue');
            }
        }

        async savePrediction(data){
            const usersRef = collection(this.db, 'Prediction');
            const predictionDocRef = doc(usersRef);
          
            try {
              await setDoc(predictionDocRef,data, { merge: true });
              return true      
            } catch (error) {
              return false
            }
        }
        
}
