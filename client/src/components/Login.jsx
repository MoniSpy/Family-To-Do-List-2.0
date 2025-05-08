import React from "react";
import "../../public/form.css";
import Header from "./Header";
import Footer from "./Footer";

import { GoogleAuth, LoginForm } from "./Forms";


function Login() {
  return(
    <div style={{display:"flex",flexDirection:"column",alignItems:"centre"}}>
      <Header />
        <div style={{width:"100%",display:"flex",flexDirection:"row",justifyContent:"space-around", alignItems:"center", padding:"50px"}}>
          <LoginForm/>
          <GoogleAuth text={"Sign in with google"}/>
        </div>
      <Footer/>
    </div>
 ); 
} 

export default Login;
