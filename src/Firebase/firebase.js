import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_APIKEY ,
  authDomain: process.env.FIREBASE_AUTHDOMAIN ,
  projectId: process.env.FIREBASE_PROJECTID ,
  storageBucket: process.env.FIREBASE_STORAGEBUCKET ,
  messagingSenderId: process.env.FIREBASE_MESSAGINGSENDERID ,
  appId: process.env.FIREBASE_APPID
};

export const app = initializeApp(firebaseConfig); 
export const db = getFirestore(app);

export async function createContact(contact) {
  //console.log("Add function called");
  try {
    const ref = collection(db,"contact-details");
    await addDoc(ref,contact);
  } catch (error) {
    return "Error occured while adding new contact!! Please try again"
  }
  return null;
}

export async function modifyContact(contact,id) {
  //console.log("Modify function called");
  try {
    const ref = doc(db,"contact-details",id);
    await updateDoc(ref,contact);
  } catch (error) {
    return "Error occured while modifying contact!! Please try again"
  }
  return null;
}

