import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyAp2WFAHvt8X19G1bWCSCyF5xVLpnSFGwg",
    authDomain: "weconnect-3e629.firebaseapp.com",
    databaseURL: "https://weconnect-3e629-default-rtdb.firebaseio.com",
    projectId: "weconnect-3e629",
    storageBucket: "weconnect-3e629.appspot.com",
    messagingSenderId: "308864511172",
    appId: "1:308864511172:web:fd6ce527126581e208ad91",
    measurementId: "G-S5LTQ5KC5L"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider }
export default db;