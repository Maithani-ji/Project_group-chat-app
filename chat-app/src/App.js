import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from 'react'


import { getDatabase, ref, push, set ,onChildAdded} from "firebase/database";
import { GoogleAuthProvider ,getAuth,signInWithPopup} from "firebase/auth";



function App() {
  const db = getDatabase();



const provider = new GoogleAuthProvider();
const auth = getAuth();
const googlelogin=()=>{
  signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    setuser({name:result.user.displayName,email:result.user.email})
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
}
const [user,setuser]=useState('');
 const [msg,setmsg]=useState([]);
const [chat,setchat]=useState([]);
const chatListRef = ref(db, 'chats');

const updateheight=()=>{
  const el=document.getElementById('chat');
  if(el){
    el.scrollTop=el.scrollHeight;
  }
 
}

useEffect(()=>{
  
  onChildAdded(chatListRef, (data) => {
   
  //console.log(data.val());
  setchat(chat=>[...chat,data.val()]);// important
  setTimeout(()=>{
  updateheight()},100)
  });
},[])



const sendchat=()=>{

 

// Create a new post reference with an auto-generated id


const chatRef = push(chatListRef);
set(chatRef, {
  user,message:msg
    // ...
});


  // const c=[...chat];
  // c.push({name,message:msg})
  // setchat(c);
  setmsg("");
}
  return (
    <div >
    { user.email? null :<div>
        {/* <input type='text' placeholder='enter name to start' onBlur={e=>setname(e.target.value)}></input> */}
        <button onClick={e=>{googlelogin()}}>Sign in</button>
      </div>}
     {user.email? <div>
      <h3>User: {user.name}</h3>
   <div  id='chat'  className="chat-container">
     { chat.map((c,i)=> (// remove strict mode from index.js to enable single rendering than double
     <div key={i} className={`container ${c.user.email===user.email ? 'me':''}`}>
        <p className="chatbox">
          <strong>{c.user.name}:</strong>
          <span>{c.message}</span>
        </p>
      </div>
     ))}
    </div>
    </div> : null}
   
   
    <div className='btm'>
      <input type='text' placeholder='enter your chat' onInput={e=>setmsg(e.target.value)} value={msg}>

      </input>
      <button onClick={e=>sendchat()}>send</button>
    </div>
    </div>
  );
}

export default App;
