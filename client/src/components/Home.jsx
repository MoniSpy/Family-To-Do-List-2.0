import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Link } from "react-router-dom";


function Home(){


    return(
        <div>
            <Header/>
                <div className="main">
                
                    <Link style={{ textDecoration: 'none' }} to="/register">
                        <div className="butt" >
                            <button>Register</button>
                        </div>
                    </Link>
                    <Link style={{ textDecoration: 'none' }} to="/login">
                        <div className="butt" >
                            <button>Login</button>
                        </div>
                    </Link>
                </div>
            <Footer/>
        </div>
    );
}
    



export default Home;