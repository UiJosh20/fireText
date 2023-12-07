

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  sendEmailVerification,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCfZ-C9JWo50hGKMT4FRrYbfMc4DqxX_Qo",
  authDomain: "firetex-6b754.firebaseapp.com",
  projectId: "firetex-6b754",
  storageBucket: "firetex-6b754.appspot.com",
  messagingSenderId: "380817330565",
  appId: "1:380817330565:web:3b1dc12593c17f269eb4ec"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const googleSignin = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      if (user) {
        sendEmailVerification(auth.currentUser).then(() => {
          console.log("Verification email sent!");
        });
        window.location.href = "newsfeed.html";
      } else {
        window.location.href = "index.html";
      }
    })
    .catch((error) => {
      let errorCode = error.code;
      console.log(errorCode);
      if (errorCode == "auth/account-exists-with-different-credential") {
        showerr.innerHTML = `<p style="color:red; text-align:center;">A user is already signed in with that email</p>`;
        setTimeout(() => {
          showerr.style.display = "none";
        }, 3000);
      }else if(errorCode == "auth/internal-error") {
        showerr.innerHTML = `<p style="color:orange; text-align:center;">you are not connected to the internet</p>`;
        setTimeout(() => {
          showerr.style.display = "none";
        }, 3000);
      }
    });
};
window.googleSignin = googleSignin;



const signinEmail = () => {
  let email = yourEmail.value;
  let password = yourPass.value;
  yourEmail.value = "";
  yourPass.value = "";
  if (email == "" || password == "") {
    showerr.innerHTML = `<p style="color:red; text-align:center;">Email and password cannot be left empty</p>`;
    setTimeout(() => {
      showerr.style.display = "none";
    }, 4000);
  }
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
      window.location.href ="newsfeed.html";
    })
    .catch((error) => {
      let errorCode = error.code;
      console.log(errorCode);
      if (errorCode == "auth/invalid-login-credentials") {
        showerr.innerHTML = `<p style="color:red; text-align:center;"> you have entered an invalid email and password</p>`;
        setTimeout(() => {
          showerr.style.display = "none";
          
        }, 4000);
      }else if(errorCode == "auth/internal-error" || errorCode == "auth/network-request-failed") {
        showerr.innerHTML = `<p style="color:orange; text-align:center;">you are not connected to the internet</p>`;
        setTimeout(() => {
          showerr.style.display = "none";
        }, 4000);
      }
    });
};

window.signinEmail = signinEmail;

const btnAll = () => {
  let email = yourOEmail.value;
  let password = yourOPass.value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
      window.location.href = "index.html";
    })
    .catch((error) => {
      let errorCode = error.code;
      console.log(errorCode);
      if (errorCode == "auth/email-already-in-use") {
        showerr.innerHTML = `<p style="color:red; text-align:center;">This email already exists</p>`;
        setTimeout(() => {
          showerr.style.display = "none";
        }, 4000);
      } else {
        yourOEmail.value = "";
        yourOPass.value = "";
      }
    });
};

window.btnAll = btnAll;
