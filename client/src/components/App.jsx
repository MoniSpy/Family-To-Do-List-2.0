import React, {useState, useEffect} from "react";
import Header from "./Header";
import Footer from "./Footer";
import TodoList from "./TodoList";
import axios from "axios";

const BASE_URL= "http://localhost:3000";

function App() {

const [lists, setLists]=useState();

useEffect(()=>{
    if (!lists){
      axios.get(BASE_URL+"/").then((res)=>{
        setLists(res.data || []);
      });
    }
  },[lists]);

async function addTask(newItem) {
    const response =await axios.post(BASE_URL+"newtask", newItem); 
    return response.data;
  }
  
async function addList(){
  console.log("add new list process");
    const newList={
    title:"New list title..",
    user_id:9
  }

  const response= await axios.post(BASE_URL+"/newlist", newList);
  console.log("response data");
  console.log(response.data);
  const result={
    id:response.data,
    title:newList.title,
    list:[]
  }
  setLists([...lists, result]);
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
                  className="col-sm-4"
                  key={index}
                  list={list.list}
                  title={list.title}
                  onAdd={addTask}
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
