import React from "react";
import Home from "./Home";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import Lists from "./Lists";


function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/lists" element={<Lists/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
