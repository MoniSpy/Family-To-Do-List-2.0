import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { getUsersLists } from "./persistance/lists.js";
import { getUsers } from "./persistance/users.js";
import { getDate } from "./helpers/helpers.js";





const app=express();
const port= 3000;

//Middelwear
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());



const id=9;
app.get("/", async (req,res) =>{
    //Get user list
    const usersLists= await getUsersLists(id);
    //Get users
    const users=await getUsers();
    console.log("User lists " );
    console.log(usersLists);
    console.log("Users ");
    console.log(users);
});

//Add task
app.post("/newtask" , async (req,res) =>{;
    console.log(req.body); 
    res.send("Hello from the backend"); 
});



app.get("",)
app.listen(port, () =>{
    console.log(`Server running on port ${port}`);
});