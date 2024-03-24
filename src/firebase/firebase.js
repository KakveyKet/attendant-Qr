
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, serverTimestamp } from "firebase/firestore";
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
    apiKey: "AIzaSyB4XmWyHuXf455PU9M9SCz87bn2_Lo9w4I",
    authDomain: "reparing-lab.firebaseapp.com",
    projectId: "reparing-lab",
    storageBucket: "reparing-lab.appspot.com",
    messagingSenderId: "433296803859",
    appId: "1:433296803859:web:a4cf56e306a6ea3b4a17e6",
    measurementId: "G-H46Z6CZSP1"
};

const firebaseApp = initializeApp(firebaseConfig);
const projectFirestore = getFirestore(firebaseApp);
const projectAuth = getAuth(firebaseApp);
const projectStorage = getStorage(firebaseApp);
const timestamp = serverTimestamp;
export { projectAuth, projectFirestore, projectStorage, timestamp };