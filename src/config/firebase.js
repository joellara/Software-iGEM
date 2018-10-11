import firebase from "firebase"
import { FirebaseConfig } from "./keys"
firebase.initializeApp(FirebaseConfig)
const databaseRef = firebase.database().ref()
export const promotersRef = databaseRef.child("parts/promoters")
export const rbsRef = databaseRef.child("parts/rbs")
export const terminatorsRef = databaseRef.child("parts/terminators")
