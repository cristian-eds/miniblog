import { initializeApp } from "firebase/app";
import getFirestore from "firebase/firebase";

const firebaseConfig = {
  apiKey: "AIzaSyC7-IAKDgW4jauwGSQcrWjqpKKNpqFZZpo",
  authDomain: "miniblog-dbad1.firebaseapp.com",
  projectId: "miniblog-dbad1",
  storageBucket: "miniblog-dbad1.appspot.com",
  messagingSenderId: "837254243628",
  appId: "1:837254243628:web:b5882b2977aefc737a3889"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);