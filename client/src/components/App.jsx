import React from "react";
import Form from "./Form";
import Home from "./Home";
import Footer from "./Footer";
import {BrowserRouter, Route, Routes} from "react-router-dom";


function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route path="/register" element={<Form/>}/>
        <Route path="/login" element={<Footer/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
