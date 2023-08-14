import firebase from '../firebase/config.js';

class AuthService {
  async registerWithEmailAndPassword(email, password) {
    try {
      const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
      return userCredential.user;
    } catch (error) {
      if (error.code === 'auth/weak-password') {
        return 'weak-password'; // Renvoyer un code d'erreur spécifique pour mot de passe faible
      }
      return error.message; // Renvoyer le message d'erreur standard pour d'autres erreurs
    }
  }
}

export default new AuthService();
