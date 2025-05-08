import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { addNewItem ,deleteItem, editItem} from "./persistance/items.js";
import {addNewList, deleteList, editList} from "./persistance/lists.js";
import { getUserItems, getUserLists, addUser} from "./persistance/users.js";
import { getDate } from "./helpers/helpers.js";
const app=express();
const port= 3000;
const userId=9;

//Middelwear
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.get("/", async (req,res) =>{
    const items=await getUserItems(userId);
    const lists=await getUserLists(userId);
    const listsById={
    }
    
    lists.forEach(list => {
        listsById[list.id]={...list, items:[]} 
    });

    items.forEach(item =>{
        listsById[item.lists_id.toString()].items=[...listsById[item.lists_id.toString()].items, item];
    });
    
    res.send(Object.values(listsById));
});

//Add User 
app.post("/newuser", async (req,res) => {
    const usersName=req.body.users_name;
    console.log("🚀 ~ app.post ~ usersName:", usersName);
    const newUser=  await addUser(usersName);
    console.log("🚀 ~ app.post ~ newUser:", newUser);
    res.send(newUser);
});

//register a new user
app.post("/register", async (req,res) => {
    const newUser=req.body.newUser;
    console.log(newUser);
    const user= await addUser(newUser);
    console.log(user);
    res.send(user);
});

//Add item
app.post("/newitem" , async (req,res) =>{ 
    const newItem=req.body;
    let items=await addNewItem(newItem);
    res.send(items); 
});

//Delete Item
app.delete("/deleteitem/:id", async (req,res) => {
    const itemId=Number(req.params.id);
    const result=await deleteItem(itemId);
    res.send(result);
});

//Edit Item
app.patch("/edititem/:id", async (req,res) => {
    const text=Object.keys(req.body);
    const item={
        id:Number(req.params.id),
        text:text.toString(),
        creation_date:getDate(new Date())
    }
    const result=await editItem(item);
    
});

//Add new list
app.post("/newlist" , async (req,res) => {
    const response=await addNewList(req.body);
    console.log("🚀 ~ app.post ~ response:", response)
    const id=response.id;
    const data = {
        text:" ",
        date:new Date(),
        completed:false,
        
        lists_id:id,
        users_id:userId
    }
    const newItem=await addNewItem(data);
    console.log("🚀 ~ app.post ~ newItem:", newItem);
    
    const newList={
        id:id,
        title:response.lists_name,
        items:newItem
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