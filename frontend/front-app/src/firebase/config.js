import { getAuth, onAuthStateChanged } from "firebase/auth";
import 'firebase/firestore';
import { initializeApp } from "firebase/app"

import Constants from 'expo-constants';

const firebaseApp = initializeApp({
  apiKey: Constants.manifest.extra.APIKEY,
  authDomain: Constants.manifest.extra.AUTHDOMAIN,
  projectId: Constants.manifest.extra.PROJECTID,
  storageBucket: Constants.manifest.extra.STORAGEBUCKET,
  messagingSenderId: Constants.manifest.extra.MESSAGINGSENDERID,
  appId: Constants.manifest.extra.APPID,
  measurementId: Constants.manifest.extra.MEASUREMENTID,
  persistence: true
});
const auth = getAuth(firebaseApp);
export  {firebaseApp, auth};