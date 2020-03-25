import Firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyAheCUKvsQf2CzGAWVBlE2j97xSCYo5H74",
    authDomain: "sigapp-fe8ef.firebaseapp.com",
    databaseURL: "https://sigapp-fe8ef.firebaseio.com",
    projectId: "sigapp-fe8ef",
    storageBucket: "sigapp-fe8ef.appspot.com",
    messagingSenderId: "316812337489",
    appId: "1:316812337489:web:abed236f6ab51604203370"
};

const appConfig = Firebase.initializeApp(firebaseConfig);
export const db = appConfig.database();
export const auth = Firebase.auth();