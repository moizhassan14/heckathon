  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
  import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword  } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
  import { getFirestore,collection, addDoc,doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
  
  
  const firebaseConfig = {
    apiKey: "AIzaSyCD03uh2aQWGYB1IsZh1o7zjV0DxLrCSMw",
    authDomain: "login-signup-9fca4.firebaseapp.com",
    projectId: "login-signup-9fca4",
    storageBucket: "login-signup-9fca4.appspot.com",
    messagingSenderId: "485276283878",
    appId: "1:485276283878:web:8ae6c7c7de45b8cfda9c27"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);


  let loader =document.getElementById("loader")

        let showloder=()=>{
          loader.style.display = "block";
        }
        
        let hideloder=()=>{
          loader.style.display = "none";
        }



   let signupBtn = document.getElementById("signUp");
  signupBtn &&  signupBtn.addEventListener ("click", ()=>{
   
   let  email = document.getElementById("user-email")
   let  password = document.getElementById("password")
   let  phone = document.getElementById("user-number")
  let  user = document.getElementById("user-name")


   let userData ={
   user:user.value,
  phone: phone.value,
   email :  email.value ,
  password:password.value,
   }


   

   showloder() ||  createUserWithEmailAndPassword(auth, userData.email, userData.password)
  .then(async (userCredential) => {
   
    const user = userCredential.user;

    try {
         await setDoc(doc(db, "users", user.uid), {
        ...userData,
        uid:user.uid
           
          
         });
    
         localStorage.setItem("userId",user.uid ,)
         location.href="index.html"
         console.log("added")
       } catch (e) {
         console.error("Error adding document: ", e);
         swal({
          title: "Opps",
          text: e,
         
        });
           }

           hideloder()
     })
         .catch((error) => {
          hideloder()
           const errorMessage = error.message;
           sweetAlert("Oops...", error.message, "error" );
         })

        })

      
 let loginBtn = document.getElementById("loginBtn")
 loginBtn && loginBtn.addEventListener("click", ()=>{
 
   let  email = document.getElementById("user-email")
   let  password = document.getElementById("password")


   showloder() ||  signInWithEmailAndPassword(auth, email.value, password.value)
  .then((userCredential) => {
 
    const user = userCredential.user;
  try {
console.log("welcome to my website")
  localStorage.setItem("uid", user.uid)
  window.location.href="./dashbordwithlogin.html"

} catch (err) {   console.log(err)

}

hideloder()
swal({
  title: "Congratulations",
  text: "Login is succesfully",
 
});

email.value="";
password.value="";
  })
  .catch((error) => {
    hideloder()
    console.log("error.message",error.message)
    sweetAlert("Oops...", error.message, "error" );
  });

})








































// })

  
