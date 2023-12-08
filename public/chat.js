// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";

import {
  getDatabase,
  ref,
  set,
  onValue,
} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js";

// import {
//   getStorage,
//   ref as storageRef,
//   uploadBytesResumable,
// } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyCfZ-C9JWo50hGKMT4FRrYbfMc4DqxX_Qo",
  authDomain: "firetex-6b754.firebaseapp.com",
  projectId: "firetex-6b754",
  storageBucket: "firetex-6b754.appspot.com",
  messagingSenderId: "380817330565",
  appId: "1:380817330565:web:3b1dc12593c17f269eb4ec",
  databaseURL: "https://firetex-6b754-default-rtdb.firebaseio.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
// const storage = getStorage(app);
let startPoint = 0;

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log(user);
    let Cname = user.displayName;
    let maily = user.email;
    let dispImg = user.photoURL;

    if (Cname == null && dispImg == null) {
      display.innerHTML = `
    <h3>${maily}</h3>
    <img width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/FFFFFF/exit.png" alt="exit" onclick="googleSignOut()" />

      
      `;
    } else {
      display.innerHTML = `
      <h3>${Cname}</h3>
      <img src=${dispImg} style="border-radius: 100%;"  class="minus" title="profile picture"/>
      <img width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/FFFFFF/exit.png" alt="exit" onclick="googleSignOut()" />


    `;
    }
  } else {
    window.location.href = "index.html";
  }
});

const googleSignOut = () => {
  signOut(auth)
    .then(() => {
      console.log("out with you");
    })
    .catch((error) => {
      console.log(error);
    });
};

window.googleSignOut = googleSignOut;


const displayChat = document.getElementById('displayChat');
const scrollToBottom = () => {
  displayChat.scrollBottom = displayChat.scrollHeight;
};


const submitData = () => {
  let date = new Date().toLocaleDateString();
  let time = new Date().toLocaleTimeString();
  let chatHr = chatH.value;
  onAuthStateChanged(auth, (user) => {
    let userName = user.displayName;
    let photo = user.photoURL;
    let email = user.email;
    if (chatHr.trim() !== "") {
      if (userName != null && photo != null){
        chatH.value = "";
        let chatObj = {
          photo,
          userName,
          chatHr,
          date,
          time,
        };
        let dbRef = ref(database, `chatMessages`);
        set(dbRef, chatObj);
      }else{
        chatH.value = "";
        let chatObj = {
          email,
          chatHr,
          date,
          time,
        };
        let dbRef = ref(database, `chatMessages`);
        set(dbRef, chatObj);
      }

      // let filename = myFile.files[0].name;
      // let uploadedFile = myFile.files[0];
      // let stref = storageRef(
      //   storage,
      //   `Uploaded/${todoObj.userName}/${filename}`
      // );
      // let doneStoring = uploadBytesResumable(storageRef, uploadedFile);
      // doneStoring.on("state_changed", (snapshot) => {
      //   let progress = snapshot.bytesTransferred;
      //   let total = snapshot.totalBytes;
      //   const showProgress = ((progress / total) * 100).toFixed(2);
      //   console.log(showProgress);
      // });
    }
  });
  scrollToBottom()
};
window.submitData = submitData

const chatRef = ref(database, 'chatMessages');
onValue(chatRef, (snapshot) => {
  const chatMessages = snapshot.val();
  console.log(chatMessages);
  onAuthStateChanged(auth, (user)=>{
    console.log(user.displayName);
    const currentUser = user.displayName
    const currentEmail = user.email
    if (chatMessages.userName === currentUser) {
      // Display current user's message on the right
      displayChat.innerHTML += `
      <div class="w75 w-75 float-end">
      <div class="bgprimary text-white w-25 float-end p-2 mb-2 rounded-3 bubble">
      <p class="text-white fw-bold w-100 nameing">${chatMessages.userName}</p>
          <p>${chatMessages.chatHr}</p>
          <small class="float-end fw-bold">${chatMessages.time}</small>
          <img src=${chatMessages.photo} style="border-radius: 100%;"  class="minus1" title="profile picture"/>  
          </div>

      </div>
      `;
    }else if (chatMessages.email == currentEmail){
      displayChat.innerHTML += `
      <div class="w75 w-100 float-end">
      <div class="bgprimary text-white w-75 float-end p-2 mb-2 rounded-3 bubble">
      <p class="text-white fw-bold w-100 nameing">${chatMessages.email}</p>
          <p>${chatMessages.chatHr}</p>
          <small class="float-end fw-bold">${chatMessages.time}</small>
          </div>

      </div>
      `;
    }
     else {
      // Display other users' messages on the left
      displayChat.innerHTML += `
      <div class="w75 w-75 float-start">
      <div class="bg-light text-black w-75 float-start p-2 mb-2 rounded-3 bubble bgprimary1">
      <p class="text-danger fw-bold w-100">${chatMessages.userName}</p>
          <p>${chatMessages.chatHr}</p>
          <small class="float-start fw-bold text-black">${chatMessages.time}</small>
          <img src=${chatMessages.photo} style="border-radius: 100%;"  class="minus2" title="profile picture"/>  
        </div>
      </div>
      `;
    }
  })
 
  
});
