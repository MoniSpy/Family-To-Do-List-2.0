import express from "express";
import { Strategy } from "passport-local";
import {Strategy as GoogleStrategy} from "passport-google-oauth20";
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
import e from "express";


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
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false,
    cookie:{
      maxAge:1000*60*60*24,
       }
    })
  );
  
  app.use(passport.initialize());
  app.use(passport.session());



app.get("/authenticated",(req,res) => {
  console.log("authenticate");
  if(req.isAuthenticated()){
    return res.send(req.user);
  }else{
    console.log("not authenticated");
  }
});

app.get ("/auth/google", passport.authenticate("google", {
  scope:["profile", "email"], 
}));

app.get("/google/auth/lists", passport.authenticate("google", 
  {
    successRedirect:"http://localhost:5173/lists",
    failureRedirect:"/login"
}));



//Login POST route
app.post("/login/password", passport.authenticate("local",
  { 
    successRedirect:"/authenticated",
    failureRedirect:"/login"
  }));
  
  app.get("/lists", async (req,res)=>{
    currentUser=req.user;
    userId=currentUser.id;
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

app.post("/register", async (req,res) => {
    const newUser=req.body.newUser;
    console.log("🚀 ~ app.post ~ newUser=:", newUser);
    try{
      const checkResult= await db.query("SELECT * FROM users WHERE email=$1", 
        [newUser.email]
      );
      if (checkResult.rows.length>0){
        res.send("User already exist. Try logging in");


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
           console.log("🚀 ~ bcrypt.hash ~ user:", user);
           res.sendStatus(200); 
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
  let newL={
    title:req.body.title,
    user_id:userId
  }
  const response=await addNewList(newL); 
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

passport.use("google",
    new GoogleStrategy ({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL:"http://localhost:3000/google/auth/lists",
      userProfileURL:"https://www.googleapis.com/oauth2/v3/userinfo",
    }, async(accessToken, refreshToken, profile, cb) =>{
     const user= profile._json;
      try {
        const result=await db.query("SELECT * FROM users WHERE email = $1" ,
          [user.email]);
          if (result.rows.length===0) {
            const newUser=await db.query(
              "INSERT INTO users (email, password, first_name, last_name) VALUES ($1, $2, $3, $4) RETURNING *", 
              [user.email, "google", user.given_name, user.family_name]
            );
            cb(null, newUser.rows[0]);
          } else {
            cb(null, result.rows[0]);
          }
      } catch(err) {
        cb(err);
      }
    } 
  )
 );

passport.serializeUser((user, cb)=>{
  // userId=user.id;
  console.log("🚀 ~ passport.serializeUser ~ user:", user)
  return cb(null,user);
});

passport.deserializeUser((user,cb)=>{
  console.log("🚀 ~ passport.deserializeUser ~ user:", user);
  return cb(null,user);
});

app.listen(port, () =>{
    console.log(`Server running on port ${port}`);
});