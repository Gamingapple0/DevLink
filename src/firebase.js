// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, updateProfile, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  PhoneAuthProvider,
} from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage"


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCzY8mOVLlWUpEDgnWM8o22WgnkHVB-lXQ",
  authDomain: "sit313-ead62.firebaseapp.com",
  projectId: "sit313-ead62",
  storageBucket: "sit313-ead62.appspot.com",
  messagingSenderId: "466371326129",
  appId: "1:466371326129:web:23ceb203494c6f523c7290"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Get the authentication instance from your initialized app
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app)



// Function to create a new user with email and password
export const signUpWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    // Handle the error appropriately
    throw error;
  }
};

export const loginWithEmailAndPassword = async(email, password) => {
    try{
        const userCredential = await signInWithEmailAndPassword(auth,email, password);
        return userCredential;
    }
    catch(e){
        throw e;
    }
}

export const updateDetails = async(obj)=>{
  try{
    await updateProfile(auth.currentUser,obj)
    console.log(auth.currentUser.password)
  }
  catch(e){
    console.error(e)
  }
}

export const sendSMSToPhoneNumber = async (phoneNumber) => {
  try {
    // const recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
    //   size: 'invisible',
    //   callback: function (response) {
    //     // reCAPTCHA solved, you can proceed with phone number verification.
    //   },
    // });
    const phoneProvider = new PhoneAuthProvider(auth);
    const verificationId = await signInWithPhoneNumber(phoneProvider, phoneNumber, true);
    return verificationId;
  } catch (error) {
    throw error;
  }
};