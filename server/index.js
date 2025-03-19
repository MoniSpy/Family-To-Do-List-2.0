import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { addNewItem ,getAllItems} from "./persistance/tasks.js";
import {addNewList, deleteList, editList} from "./persistance/lists.js";
import { getUserItems, getUserLists} from "./persistance/users.js";

const app=express();
const port= 3000;
const userId=9;

//Middelwear
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.get("/", async (req,res) =>{
    const tasks=await getUserItems(userId);
    const lists=await getUserLists(userId);
    const listsById={
    }
    lists.forEach(list => {
        listsById[list.id]={...list, tasks:[]} 
    });

    tasks.forEach(task =>{
        listsById[task.lists_id.toString()].tasks=[...listsById[task.lists_id.toString()].tasks, task];
    });
    
    res.send(Object.values(listsById));
});


//Add task
app.post("/newtask" , async (req,res) =>{ 
    const newItem=req.body;
    let items=await addNewItem(newItem);
    res.send(items); 
});
//Add new list
app.post("/newlist" , async (req,res) => {
    const response=await addNewList(req.body);
    console.log("🚀 ~ app.post ~ response:", response)
    const id=response.id;
    const data = {
        title:" ",
        date:new Date(),
        completed:false,
        
        lists_id:id,
        users_id:userId
    }
    const newTask=await addNewItem(data);
    console.log("🚀 ~ app.post ~ newTask:", newTask);
    
    const newList={
        id:id,
        title:response.lists_name,
        tasks:newTask
    }
    res.send(newList);
});
//Delete list 
app.post("/deletelist", async(req,res)=>{
    const id=Number(Object.keys(req.body));
    const deleted=await deleteList(id);
    console.log("🚀 ~ app.post ~ deleted:", deleted);
    res.send(deleted); 
});
//Edit List
app.post("/editlist", async (req,res) => {
    const response=req.body;
    const listToEdit={
        id : req.body.id,
        name: req.body.listName
    }
    const edited=await editList(listToEdit);
    res.send(edited.lists_name);
});

app.listen(port, () =>{
    console.log(`Server running on port ${port}`);
});