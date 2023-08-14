import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import Constants from 'expo-constants';

const firebaseConfig = {
  apiKey: Constants.manifest.extra.APIKEY,
  authDomain: Constants.manifest.extra.AUTHDOMAIN,
  projectId: Constants.manifest.extra.PROJECTID,
  storageBucket: Constants.manifest.extra.STORAGEBUCKET,
  messagingSenderId: Constants.manifest.extra.MESSAGINGSENDERID,
  appId: Constants.manifest.extra.APPID,
  measurementId: Constants.manifest.extra.MEASUREMENTID,
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;