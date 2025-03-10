import React from 'react';
import DeleteIcon from "@mui/icons-material/DeleteOutlined";

function TodoItem   ({ task, deleteTask, toggleCompleted }) {

function handleChange() {
    toggleCompleted(task.id);
 }
 
 return (
    <div className="todo-item">
     <input 
        type="checkbox"
        checked={task.completed}
        onChange={handleChange}
     />
     <p>{task.text}</p>
     <button className="deleteButton" onClick={() => deleteTask(task.id)}>
      <DeleteIcon />
    </button>
    </div>
 );
}
export default TodoItem;