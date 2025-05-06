import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Link } from "react-router-dom";




function Home(){
async function register(){ 
    console.log("register");
}

async function login(){
    console.log("login");
}
    return(
        <div>
            <Header/>
                <div className="main">
                
                    <Link style={{ textDecoration: 'none' }} to="/register">
                        <div className="butt" >
                            <button  onClick={() => register ()}>Register</button>
                        </div>
                    </Link>
                    <Link style={{ textDecoration: 'none' }} to="/login">
                        <div className="butt" >
                            <button  onClick={() => login()}>Login</button>
                        </div>
                    </Link>
                </div>
            <Footer/>
        </div>
    );
}
    



export default Home;