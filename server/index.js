import express from "express";
import { getUsersLists } from "./persistance/lists.js";
import { getUsers } from "./persistance/users.js";



const app=express();
const port= 3000;


const id=5;
app.get("/", async (req,res) =>{
    //Get user list
    const usersLists= await getUsersLists(id);
    //Get users
    const users=await getUsers();
    console.log(usersLists);
    console.log(users);
});
app.listen(port, () =>{
    console.log(`Server running on port ${port}`);
});