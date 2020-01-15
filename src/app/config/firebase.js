import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyD8hknA4oD22LZuSX-mO2I3JnvwsCoZQKE',
  authDomain: 'revents-ea52e.firebaseapp.com',
  databaseURL: 'https://revents-ea52e.firebaseio.com',
  projectId: 'revents-ea52e',
  storageBucket: 'revents-ea52e.appspot.com',
  messagingSenderId: '909262681968',
  appId: '1:909262681968:web:61693569a5a3a93d5701b5'
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;
