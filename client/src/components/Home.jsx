
import React, {useState, useEffect} from "react";
import Header from "./Header";
import Footer from "./Footer";
import TodoList from "./TodoList";
import axios from "axios";



const BASE_URL= "http://localhost:3000";
let userId=9;


function Home() {
    
const [lists, setLists]=useState();

useEffect(()=>{
    if (!lists){
      axios.get(BASE_URL+"/").then((res)=>{
        setLists(res.data || []);
      });
    }
  },[lists]);

async function addItem(newItem) {

    try{
      const response =await axios.post(BASE_URL+"/newitem", newItem); 
      return response.data;
    }catch(e){
      console.log(e.message);
      }
    }   
  
  async function editItem(text, itemId, persist){
    if (persist){

      try{
        const response=await axios.patch(BASE_URL+`/edititem/${itemId}`, text);
      }catch(e){
        console.log(e.message);
      } 
    }
}

 async function deleteItem(itemId){
  try{
    const response= await axios.delete(BASE_URL+`/deleteitem/${itemId}`);
  }catch(e){
    console.log(e.message);
  }
 } 

 async function addUser(){
  const users_name="Maria";
  try{
    const response=await axios.post(BASE_URL+"/newuser",{users_name} );
    const newUser=response.data;
  }catch(e){
    console.log(e.message);
  }
 }
  
async function addList(){
  const newL={
    title:"New list title..",
    user_id:userId,
  }
  try{
    const response= await axios.post(BASE_URL+"/newlist", newL);
    const newList=response.data;
    const result={
      id:newList.id,
      title:newList.title,
      items:newList.items
    }
    setLists([...lists, result]);
  }catch(e){
    console.log(e.message);
  }
}

async function deleteList(listId){
  try{
    const response= await axios.post(BASE_URL+"/deletelist", listId);
  }catch(e){
    console.log(e.message);
  }
}

async function editList(editListId, list_name){
  const edited={
    id:editListId,
    listName:list_name
  }
  try{
    const response= await axios.post(BASE_URL+"/editlist",edited);
  }catch(e){
    console.log(e.message);
  }
}

return (
    <div>
      <Header /> 
      <div className="newList" >
          <button  onClick={() => addList ()}>New List</button>
      </div>
      <div className="newList" >
          <button  onClick={() => addUser ()}>New User</button>
      </div>
      <div className="container">
        <div className="row">
          {lists?.map((list, index )=> {
            return (
                <TodoList 
                  id={list.id}
                  className="col-sm-4"
                  key={index}
                  items={list.items}
                  title={list.lists_name}
                  onAdd={addItem}
                  editList={editList}
                  deleteList={deleteList}
                  deleteItem={deleteItem}
                  editItem={editItem}
                />
            );
          })}
        </div>
      </div> 
      <Footer />
    </div>
  );
}

export default Home;