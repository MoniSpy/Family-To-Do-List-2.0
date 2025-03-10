import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import TodoList from "./TodoList";






const lists = [
  {
    id: 1,
    list:[
      {
        id: 1,
        text: 'Doctor ',
        completed: true
      },
      {
        id: 2,
        text: 'Meeting at School',
        completed: false
      }
    ],
    title: "To Do List 1"
  },
  {
    id: 2,
    list:[
      {
        id: 1,
        text: 'Doctor Appointment',
        completed: true
      },
      {
        id: 2,
        text: 'Meeting at School',
        completed: false
      }
    ],
    title: "To Do List 2"
  },
  {
    id: 3,
    list:[
      {
        id: 1,
        text: 'Doctor Appointment',
        completed: true
      },
      {
        id: 2,
        text: 'Meeting at School',
        completed: false
      }
    ],
    title: "To Do List 3"
  },
  {
    id: 4,
    list:[
      {
        id: 1,
        text: 'Doctor Appointment',
        completed: true
      },
      {
        id: 2,
        text: 'Meeting at School',
        completed: false
      }
    ],
    title: "To Do List 4"
  },
  {
    id:5 ,
    list:[
      {
        id: 1,
        text: 'Doctor Appointment',
        completed: true
      },
      {
        id: 2,
        text: 'Meeting at School',
        completed: false
      }
    ],
    title: "To Do List 5"
  }
  
];


  

function App() {
  return (
    <div>
      <Header /> 
      <div className="container">
        <div className="row">
          {lists?.map((list, index )=> {
            return (
                <TodoList 
                  className="col-sm-4"
                  key={index}
                  list={list.list}
                  title={list.title}
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
