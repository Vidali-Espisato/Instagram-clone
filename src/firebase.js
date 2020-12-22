import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBPJkXQ6KAEWAYEamvisDMDChy2OOzi8qA",
    authDomain: "instagrammify.firebaseapp.com",
    databaseURL: "https://instagrammify.firebaseio.com",
    projectId: "instagrammify",
    storageBucket: "instagrammify.appspot.com",
    messagingSenderId: "1035948554288",
    appId: "1:1035948554288:web:f6c50f356588ecaa9f55f5",
    measurementId: "G-Z5N7L2H0E7"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };