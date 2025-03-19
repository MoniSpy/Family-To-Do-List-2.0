import React, {useState, useEffect} from "react";
import Header from "./Header";
import Footer from "./Footer";
import TodoList from "./TodoList";
import axios from "axios";

const BASE_URL= "http://localhost:3000";
const userId=9;

function App() {

const [lists, setLists]=useState();

useEffect(()=>{
    if (!lists){
      axios.get(BASE_URL+"/").then((res)=>{
        setLists(res.data || []);
      });
    }
  },[lists]);

async function addItem(newItem) {
    const response =await axios.post(BASE_URL+"/newitem", newItem); 
    return response.data;
  }

 async function deleteItem(itemId){
  const response= await axios.delete(BASE_URL+`/deleteitem/${itemId}`);
 } 
  
async function addList(){
  const newL={
    title:"New list title..",
    user_id:userId,
  }
  const response= await axios.post(BASE_URL+"/newlist", newL);
  const newList=response.data;
  const result={
    id:newList.id,
    title:newList.title,
    items:newList.items
  }
  setLists([...lists, result]);
}

async function deleteList(listId){
 const response= await axios.post(BASE_URL+"/deletelist", listId);
}

async function editList(editListId, list_name){
  const edited={
    id:editListId,
    listName:list_name
  }
  const response= await axios.post(BASE_URL+"/editlist",edited);
}

return (
    <div>
      <Header /> 
      <div className="newList" >
          <button  onClick={() => addList ()}>New List</button>
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
                />
            );
          })}
        </div>
      </div> 
      <Footer />
    </div>
  );
}


export default App;
