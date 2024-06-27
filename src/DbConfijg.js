
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyB7uym9m6RfFDrW7Djhvl0UgAI3HI-uMBo",
  authDomain: "todo-a0ef8.firebaseapp.com",
  databaseURL: "https://todo-a0ef8-default-rtdb.firebaseio.com",
  projectId: "todo-a0ef8",
  storageBucket: "todo-a0ef8.appspot.com",
  messagingSenderId: "379683209327",
  appId: "1:379683209327:web:4f8bda4192fca04725cd9a"
};

const app = initializeApp(firebaseConfig);

export default app