import react from "react";
import { useState } from "react";
import TodoItem from "./TodoItem";
import { getDate } from "../../../server/helpers/helpers";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";

function TodoList(props) {
    

    const [isVisible, setIsVisible]=useState(false);

    const [tasks, setTasks] = useState(
        props.tasks
    );

    const [text, setText] = useState('');

    const [title, setTitle]=useState(props.title);

    function submitTask(text) {
        const newTask = {
            id: Date.now(),
            text,
            completed: false
        };
        const data = {
            title:text,
            date:getDate(new Date()),
            completed:false,
            lists_id:13,
            users_id:9
        }
        props.onAdd(data);
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


    // function editTitle(event){
    //     console.log("editting title");
    //     const {value} =event.target;
    //     console.log(value);
        
    // }

   return (
    <div className={props.className} style={props.style}>
        <div className="box"> 
                <form className="list">
                    <input 
                        className="title"
                        type="text"
                        name="text"
                        // onBlur={editTitle}
                        onChange={e => setTitle(e.target.value)} 
                        placeholder="Title"  
                        value={title}
                    /> 
                    <button className="deleteList" onClick={() => deleteList()}>
                        <DeleteIcon 
                            sx={{fontSize:40}}
                        />
                    </button>
                </form>
                
                
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
                className="task"
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