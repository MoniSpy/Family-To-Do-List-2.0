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
                <Link to="/register">
                    <div className="newList" >
                        <button  onClick={() => register ()}>Register</button>
                    </div>
                </Link>
                <Link to="/login">
                    <div className="newList" >
                        <button  onClick={() => login()}>Login</button>
                    </div>
                </Link>
            <Footer/>
        </div>
    );
}
    



export default Home;