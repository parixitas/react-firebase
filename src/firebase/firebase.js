import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

const prodConfig = {
  apiKey: "AIzaSyDV5MEJODJ2q4YV_QmRixB2QrC1t7Ks0Pg",
  authDomain: "wogd-01.firebaseapp.com",
  databaseURL: "https://wogd-01.firebaseio.com",
  projectId: "wogd-01",
  storageBucket: "",
  messagingSenderId: "1058760458933"
};

const devConfig = {
  apiKey: "AIzaSyDV5MEJODJ2q4YV_QmRixB2QrC1t7Ks0Pg",
  authDomain: "wogd-01.firebaseapp.com",
  databaseURL: "https://wogd-01.firebaseio.com",
  projectId: "wogd-01",
  storageBucket: "",
  messagingSenderId: "1058760458933"
};

const config = process.env.NODE_ENV === 'production'
  ? prodConfig
  : devConfig;

if(!firebase.apps.length){
  firebase.initializeApp(config);
}

const db = firebase.database();
const auth = firebase.auth();

export {
  db,
  auth,
  firebase,
};

// export default firebase;