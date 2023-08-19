import {firebaseApp, auth} from '../firebase/config.js';
import UserService from './UserService.js';
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword  } from 'firebase/auth';
import 'firebase/compat/firestore';
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";

class AuthService {
  constructor() {
    this.userService = new UserService(getFirestore(firebaseApp)); // Pass the Firestore instance
  }

  async registerWithEmailAndPassword(email, password) {
    try {
      const authResult = await createUserWithEmailAndPassword(auth, email, password);
      sendEmailVerification(authResult.user);
  
      const userCreated = await this.userService.createUser(authResult.user.uid, authResult.user.email);
      if (userCreated) {
        return authResult.user;
      } else {
        throw new Error('Erreur lors de la création de l\'utilisateur dans la base de données.');
      }
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
      if (error.code === 'auth/weak-password') {
        throw new Error('Mot de passe faible. Veuillez choisir un mot de passe plus fort.');
      }
      throw error;
    }
  }

  async loginWithEmailAndPassword(email, password) {
    try {
      await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        return userCredential.user; 
      })
      .catch((error) => {
        throw new Error('Combinaison email/mot de passe invalide');
      });
    } catch (error) {
      throw new Error('Combinaison email/mot de passe invalide');
    }
  }
}  

export default new AuthService();