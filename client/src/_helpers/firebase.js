import firebase from 'firebase';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBewJCH8KSFNUkrIsGy57NTUiMAf4lbrVo',
  authDomain: 'tasktracker-742a7.firebaseapp.com',
  projectId: 'tasktracker-742a7',
  storageBucket: 'tasktracker-742a7.appspot.com',
  messagingSenderId: '1005380077878',
  appId: '1:1005380077878:web:0c7c0b4dac753a40420b97',
  measurementId: 'G-BJXNSDR3FE',
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

export { storage, firebase as default };
