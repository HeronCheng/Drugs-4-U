import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDocs,getDoc,collection,query, where,setDoc, deleteDoc } from "firebase/firestore";
import { getStorage, ref, getDownloadURL, listAll } from "firebase/storage";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import { getAuth } from "firebase/auth";



const firebaseConfig = {
    apiKey : process.env.REACT_APP_APIKEY,
    authDomain : "drugs-4-u.firebaseapp.com",
    databaseURL : "https://drugs-4-u-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId : "drugs-4-u",
    storageBucket : "drugs-4-u.appspot.com",
    messagingSenderId : process.env.REACT_APP_MESSAGINGSENDERID,
    appId : process.env.REACT_APP_APPID,
    measurementId : process.env.REACT_APP_MEASUREMENTID
};


const app = initializeApp( firebaseConfig );

const db = getFirestore( app );

const storage = getStorage( app );

const auth = getAuth( app );

export default auth;

export {
    db, doc, getDocs, getDoc, collection, query, where, setDoc, deleteDoc,
    storage, ref, getDownloadURL, listAll
};