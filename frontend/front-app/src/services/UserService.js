import firebase from "../firebase/config";
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';
export default class UserService {
  constructor(fire) {
    this.db = fire; // Utilisez firebase.firestore() pour accéder à la base de données Firestore
  }

  async createUser(userId, login) {
      const usersRef = collection(this.db, 'Users');
      const userDocRef = doc(usersRef, userId);
    
      try {
        await setDoc(userDocRef, { email:login });
        return true      
      } catch (error) {
        return false
      }
  }
  
  
  
}
