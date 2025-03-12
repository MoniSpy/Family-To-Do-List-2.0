import react from "react";
import { useState } from "react";
import TodoItem from "./TodoItem";
import { getDate } from "../../../server/helpers/helpers";


function TodoList(props) {
    const [tasks, setTasks] = useState(
        props.list
    );

    const [text, setText] = useState('');

    function submitTask(text) {
        const newTask = {
            id: Date.now(),
            text,
            completed: false
        };
        const data = {
            title:text,
            date:getDate(new Date()),
            lists_id:13,
            users_id:9
        }
        props.onAdd(data);
        console.log(data);

        setTasks([...tasks, newTask]);
        setText('');
    }

   function deleteTask(id) {
    setTasks(tasks.filter(task => task.id !== id));
    }
   function toggleCompleted(id) {
    setTasks(tasks.map(task => {
    if (task.id === id) {
        return {...task, completed: !task.completed};
    } else {
        return task;
    } 
    }));
    }
   return (
    <div className={props.className} style={props.style}>
        <div className="box"> 
            <h1>{props.title}</h1>
            {tasks.map(task => (
                <div className="item">
                    <TodoItem
                        key={task.id} 
                        task={task}
                        deleteTask={deleteTask}
                        toggleCompleted={toggleCompleted} 
                    />
                </div>
            ))}
            <input
                type="text"
                value={text}
                onChange={e => setText(e.target.value)} 
            />
            <button className="add" onClick={() => submitTask(text)}>+</button>
        </div>
    </div>
    );
   }
   export default TodoList;