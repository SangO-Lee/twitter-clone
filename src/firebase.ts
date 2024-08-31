import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDAWEBoN3MdM8JXONSQ987-QA76PJNXRvY",
    authDomain: "twitter-clone-29ba2.firebaseapp.com",
    projectId: "twitter-clone-29ba2",
    storageBucket: "twitter-clone-29ba2.appspot.com",
    messagingSenderId: "494323864444",
    appId: "1:494323864444:web:44d5aa2831cac86dddcaf9",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
