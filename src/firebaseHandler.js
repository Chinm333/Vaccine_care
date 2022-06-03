import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database"
import { firebaseConfig } from "./constants";

firebase.initializeApp(firebaseConfig);
firebase.auth();
firebase.firestore();
firebase.database();


export default firebase;