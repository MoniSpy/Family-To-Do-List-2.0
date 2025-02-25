import express from "express";
import { getUsersLists } from "./persistance/lists.js";



const app=express();
const port= 3000;


const id=5;
app.get("/", async (req,res) =>{
    const result= await getUsersLists(id);
    console.log(result);
});
app.listen(port, () =>{
    console.log(`Server running on port ${port}`);
});