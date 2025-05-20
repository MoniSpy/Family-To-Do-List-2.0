import express from "express";
import { Strategy } from "passport-local";
import env from "dotenv";
import passport from "passport";
import session from "express-session";
import bodyParser from "body-parser";
import cors from "cors";
import { addNewItem ,deleteItem, editItem} from "./persistance/items.js";
import {addNewList, deleteList, editList} from "./persistance/lists.js";
import { getUserItems, getUserLists, addUser} from "./persistance/users.js";
import { getDate } from "./helpers/helpers.js";
import { getDb } from "./persistance/db.js";
import bcrypt from "bcrypt";


let currentUser={};


const db=await getDb();
const app=express();
const port= 3000;
let userId;

const saltRounds = 10;

env.config();

//Middelwear
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));


app.use(session({
    secret:"this is my secret",
    resave:false,
    saveUninitialized:true,
    cookie:{
      maxAge:1000*60*60*24,
       }
    })
  );
  
  app.use(passport.initialize());
  app.use(passport.session());



app.get("/authenticated",(req,res) => {
  if(req.isAuthenticated()){
    return res.send(req.user);
  }else{
    console.log("not authenticated");
  }

});

//Login POST route
app.post("/login/password", passport.authenticate("local",
  { 
    successRedirect:"/authenticated",
    failureRedirect:"/login"
  }));
 
  
  app.get("/lists", async (req,res)=>{
    console.log(req.isAuthenticated());//is authenticate is false passport isnt passing the user object--need to figure it out 
    currentUser=req.user;
    console.log("🚀 ~ app.get ~ currentUser:", currentUser);
    userId=currentUser.id;
    console.log("🚀 ~ app.get ~ userId:", userId);
    const items=await getUserItems(userId);
    const lists=await getUserLists(userId);
    const listsById={
    }
  
    lists.forEach(list => {
        listsById[list.id]={...list, items:[]} 
    });
    console.log("🚀 ~ app.get ~  listsById:",  listsById);

    items.forEach(item =>{
      console.log("🚀 ~ app.get ~ item:", item)
        listsById[item.lists_id.toString()].items=[...listsById[item.lists_id.toString()].items, item];
      });
  
      console.log("🚀 ~ app.get ~  listsById:",  listsById);
  
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

app.post("/register", async (req,res) => {
    const newUser=req.body.newUser;
    console.log(newUser);
    try{
      const checkResult= await db.query("SELECT * FROM users WHERE email=$1", 
        [newUser.email]
      );
      if (checkResult.rows.length>0){
        res.send("User already exist. Try logging in");
        // res.redirect("/login");
      }else{
        bcrypt.hash(newUser.password,saltRounds, async (err, hash) => {
        if (err){
        console.log("Error hashing password", err);
        }else{
           console.log("Hashed password:", hash);     
           const user= await addUser({
            ...newUser,
            password:hash
           });
           
           console.log(user);
           currentUser=newUser;
           req.login(user,(err)=> {
            res.redirect("/lists");
          });
        }
      })
    }
  }catch(err){
    console.log(err); 
  }

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



passport.use("local",
    new Strategy(async function verify( username, password, cb){
      console.log(username, password);    
    try {
      const result = await db.query("SELECT * FROM users WHERE email = $1", [
        username,
      ]);
      if (result.rows.length > 0) {
        const user = result.rows[0];
        const storedHashedPassword=user.password;
        bcrypt.compare(password, storedHashedPassword, (err, result) => {        console.log(user);
          if (err) {
            return cb(err);
            console.error("Error comparing passwords:", err);
          } else {
            if (result) {
              return cb(null, user)
              
            } else {
              return cb(null,false);
            }
          }
        });
      } else {
        return cb("User not found");
      }
    } catch (err) {
       return cb(err);
    }
  }
  ));
        
        



passport.serializeUser((user, cb)=>{
  console.log("🚀 ~ passport.serializeUser ~ user:", user)
  return cb(null,user);
});

passport.deserializeUser((user,cb)=>{
  console.log("🚀 ~ passport.deserializeUser ~ user:", user)
  
  return cb(null,user);
});

app.listen(port, () =>{
    console.log(`Server running on port ${port}`);
});