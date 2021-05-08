import firebase from 'firebase/app'
// Add the Firebase products that you want to use
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyD2f43cJqshN3YLedV_zhdtVNPcjJJ2AB0',
  authDomain: 'tohacks2021-c21d8.firebaseapp.com',
  projectId: 'tohacks2021-c21d8',
  storageBucket: 'tohacks2021-c21d8.appspot.com',
  messagingSenderId: '194788640914',
  appId: '1:194788640914:web:45395e1f309be7f041be4b',
  measurementId: 'G-9MVBR2M1Z8'
}
// Initialize Firebase

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
} else {
  firebase.app() // if already initialized, use that one
}

export const auth = firebase.auth()
export const firestore = firebase.firestore()
