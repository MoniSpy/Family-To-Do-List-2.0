import React from "react";
import "../../public/form.css";
import Header from "./Header";
import Footer from "./Footer";
import { RegisterForm, GoogleAuth } from "./Forms";
import { Column } from "react-virtualized";




function Register() {
    

  return(
    <div style={{display:"flex",flexDirection:"column",alignItems:"centre"}}>
      <Header />
      <div style={{width:"100%",display:"flex",flexDirection:"row",justifyContent:"space-around", alignItems:"center", padding:"50px"}}>
        <RegisterForm/>
        <GoogleAuth/>
      </div>
      <Footer/>
   </div>
 ); 
} 

export default Register;
