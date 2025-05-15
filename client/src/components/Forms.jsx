import React from "react";
import axios from "axios";
import {useState} from "react"; 
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const BASE_URL= "http://localhost:3000";

const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

const PasswordErrorMessage = () => { 
    return ( 
      <p className="FieldError">Password should have at least 8 characters</p> 
    ); 
   }; 


function  LoginForm(){
    const navegate=useNavigate();
    const [email, setEmail] = useState(""); 
    const [password, setPassword] = useState({ 
        value: "", 
        isTouched: false, 
 }); 

 const getIsFormValid = () => { 
    return ( 
      validateEmail(email) && 
      password.value.length >= 8 
    ); 
  }; 
  
  const clearForm = () => { 
    setEmail(""); 
    setPassword({ 
      value: "", 
      isTouched: false, 
    }); 
  }; 
  
  
async function handleSubmitLogin(e){
    e.preventDefault(); 
    const user={
        email:email,
        password:password.value
    }
    
    try{
        const response= await axios.post(BASE_URL+"/login/password", {username:email,password:password.value });
        console.log(response.data);
        // navegate("/lists");
    }catch(e){
        console.log(e.message);
    }
  
    console.log("logging in" , user);
    clearForm(); 
  }; 
    return(
        <div> 
        <form  onSubmit={handleSubmitLogin}> 
          <fieldset> 
            <h2>Login</h2> 
            <div className="Field"> 
              <label> 
                Email address <sup>*</sup> 
              </label> 
              <input 
                value={email} 
                onChange={(e) => { 
                  setEmail(e.target.value); 
                }} 
                placeholder="Email address"
                name="username"
              /> 
            </div> 
            <div className="Field"> 
              <label> 
                Password <sup>*</sup> 
              </label> 
              <input 
                value={password.value} 
                type="password" 
                onChange={(e) => { 
                  setPassword({ ...password, value: e.target.value }); 
                }} 
                onBlur={() => { 
                  setPassword({ ...password, isTouched: true }); 
                }} 
                placeholder="Password" 
                name="password"
              /> 
              {password.isTouched && password.value.length < 8 ? ( 
                <PasswordErrorMessage /> 
              ) : null} 
            </div> 
          
            <button className="submit" type="submit" disabled={!getIsFormValid()}> 
              Login
            </button> 
          </fieldset> 
        </form> 
      </div> 
    );
}
// sign in with google form
function GoogleAuth(props){
   const text=props.text;
    return (     
        <div className="googleAuth">
            <button style={{margin:"20px", padding:"30px"}}> 
                <a  href="/auth/google" >
                    {text}
                    <FaGoogle size={50} style={{ marginRight: "20px"}}/>
                </a>
            
            </button>  
        </div>
    );
}


// register user form 
function RegisterForm(){
    const [firstName, setFirstName] = useState(""); 
    const [lastName, setLastName] = useState(""); 
    const [email, setEmail] = useState(""); 
    const [password, setPassword] = useState({ 
        value: "", 
        isTouched: false, 
 }); 

 const getIsFormValid = () => { 
    return ( 
      firstName && 
      validateEmail(email) && 
      password.value.length >= 8 
    ); 
  }; 
  
  const clearForm = () => { 
    setFirstName(""); 
    setLastName(""); 
    setEmail(""); 
    setPassword({ 
      value: "", 
      isTouched: false, 
    }); 
  }; 
  
  
async function handleSubmitRegister(e){
    e.preventDefault(); 
    const newUser={
        firstName:firstName,
        lastName:lastName,
        password:password.value,
        email
    }
    console.log(newUser);
    try{
        const response=  await axios.post(BASE_URL+"/register", {newUser});
        const user=response.data;
        console.log(user);
    }catch(e){
        console.log(e.message);
    }


    clearForm(); 
  }; 
    return (
    <div> 
     <form onSubmit={handleSubmitRegister}> 
       <fieldset> 
         <h2>Register</h2> 
         <div className="Field"> 
           <label> 
             First name <sup>*</sup> 
           </label> 
           <input 
             value={firstName} 
             onChange={(e) => { 
               setFirstName(e.target.value); 
             }} 
             placeholder="First name" 
           /> 
         </div> 
         <div className="Field"> 
           <label>Last name</label> 
           <input 
             value={lastName} 
             onChange={(e) => { 
               setLastName(e.target.value); 
             }} 
             placeholder="Last name" 
           /> 
         </div> 
         <div className="Field"> 
           <label> 
             Email address <sup>*</sup> 
           </label> 
           <input 
             value={email} 
             onChange={(e) => { 
               setEmail(e.target.value); 
             }} 
             placeholder="Email address" 
           /> 
         </div> 
         <div className="Field"> 
           <label> 
             Password <sup>*</sup> 
           </label> 
           <input 
             value={password.value} 
             type="password" 
             onChange={(e) => { 
               setPassword({ ...password, value: e.target.value }); 
             }} 
             onBlur={() => { 
               setPassword({ ...password, isTouched: true }); 
             }} 
             placeholder="Password" 
           /> 
           {password.isTouched && password.value.length < 8 ? ( 
             <PasswordErrorMessage /> 
           ) : null} 
         </div> 
       
         <button className="submit" type="submit" disabled={!getIsFormValid()}> 
           Register 
         </button> 
       </fieldset> 
     </form> 
   </div> 
        
    );
}

export {GoogleAuth,RegisterForm, LoginForm};