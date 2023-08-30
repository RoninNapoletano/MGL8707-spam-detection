import axios from 'axios';
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';
import { firebaseApp } from '../firebase/config.js';
import TokenStorage from '../utils/Token.js';
import { getAuth, getIdToken } from 'firebase/auth';

export default class PredictionService {
    constructor(email) {
        this.email = email;
        this.db = getFirestore(firebaseApp);
    }

    async makePrediction() {
        try {
            const auth = getAuth();
            const response = await axios.post('http://localhost:3000/prediction', { email: this.email });
            const uid = await new TokenStorage().getToken('uid')||auth.currentUser.uid;
            const formattedDate = this.getFormattedDate();
            const userDocRef = doc(this.db, 'Users', uid);
           

            if (response.status === 200) {
                const predictionData = {
                    email: this.email,
                    prediction: response.data.prediction,
                    uid: userDocRef,
                    date: formattedDate
                };
                const predictionSaved = await this.savePrediction(predictionData);

                if (predictionSaved) {
                    return { success: true, data: response.data };
                } else {
                    return { success: false, error: 'Une erreur est survenue' };
                }
            } else {
                return { success: false, error: 'Une erreur est survenue' };
            }
        } catch (error) {
            console.log(error.message)
            return { success: false, error: 'Une erreur est survenue' };
        }
    }

    async savePrediction(data) {
        const usersRef = collection(this.db, 'Prediction');
        const predictionDocRef = doc(usersRef);

        try {
            await setDoc(predictionDocRef, data, { merge: true });
            return true;
        } catch (error) {
            console.error('Erreur lors de la sauvegarde de la prédiction', error);
            return false;
        }
    }

    getFormattedDate() {
        const currentDate = new Date();
        return `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')} ${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}:${currentDate.getSeconds().toString().padStart(2, '0')}`;
    }
}
