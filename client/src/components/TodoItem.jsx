import React from 'react';
import DeleteIcon from "@mui/icons-material/DeleteOutlined";

function TodoItem   ({ item, deleteItem, toggleCompleted, editItem}) {

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
      <input 
        className="itemText"
        type="text"
        value={item.text}
        id={item.id}
        onChange={(e) =>editItem(e.target.value, e.target.id)}
        onBlur= {(e) =>{editItem(e.target.value, e.target.id, true)
        }}
     />
     <button className="deleteItem" onClick={() => deleteItem(item.id)}>
      <DeleteIcon />
    </button>
    </div>
 );
}
export default TodoItem;