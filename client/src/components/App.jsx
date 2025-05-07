import React from "react";
import Home from "./Home";
import Footer from "./Footer";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Register from "./Register";


function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Footer/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
