import React from 'react';
import DeleteIcon from "@mui/icons-material/DeleteOutlined";

function TodoItem   ({ item, deleteItem, toggleCompleted }) {

function handleChange() {
    toggleCompleted(item.id);
 }
 
 return (
    <div className="todo-item">
     <input 
        type="checkbox"
        checked={item.completed}
        onChange={handleChange}
     />
     <p>{item.text}</p>
     <button className="deleteItem" onClick={() => deleteItem(item.id)}>
      <DeleteIcon />
    </button>
    </div>
 );
}
export default TodoItem;