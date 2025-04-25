// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import{getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js"
import{getFirestore, setDoc, doc} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyArQUBZ6A2uK7rMGXXMgqdPrP9-cpF2JVI",
  authDomain: "viora-421e3.firebaseapp.com",
  projectId: "viora-421e3",
  storageBucket: "viora-421e3.firebasestorage.app",
  messagingSenderId: "655394128262",
  appId: "1:655394128262:web:d04ef57c95b52617f62c07"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

function showMessage(message, divId){
  var messageDiv=document.getElementById(divId);
  messageDiv.style.display="block";
  messageDiv.innerHTML=message;
  messageDiv.style.opacity=1;
  setTimeout(function(){
      messageDiv.style.opacity=0;
  },5000)
}
const signUp=document.getElementById('submitSignUp')
signUp.addEventListener('click', (event)=>{
  event.preventDefault();
  const email=document.getElementById('rEmail').value;
  const password=document.getElementById('rPassword').value;
  const fullName=document.getElementById('fullName').value;

  const auth=getAuth(app);
  const db=getFirestore();

  createUserWithEmailAndPassword(auth,email,password)
  .then((userCredential)=>{
      const user=userCredential.user;
      const userData={
          email: email,
          fullName: fullName
      
      };
      showMessage('Account Created Successfully','signUpMessage');
      const docRef=doc(db,"users",user.uid);
      setDoc(docRef,userData)
      .then(()=>{
        window.location.href='index.html';
        // window.location.href='sign-up.html';
      })
      .catch((error)=>{
        console.error("error writing document",error);

      });

    })
    .catch((error)=>{
      const errorCode=error.code;
      if(errorCode=='auth/email-already-in-use'){
        showMessage('Email Address Already Exists !!!','signUpMessage');
      }
      else{
        showMessage('unable to create user','signUpMessage');
      }
    })

});
