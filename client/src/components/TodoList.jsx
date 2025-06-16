import { useState } from 'react'
import TodoItem from './TodoItem'
import { getDate } from '../../../server/helpers/helpers'
import DeleteIcon from '@mui/icons-material/DeleteOutlined'
import { getUserIdFromSession } from '../helpers'

function TodoList(props) {
  const userId = getUserIdFromSession()
  const [items, setItems] = useState(props.items)

  const [text, setText] = useState('')

  const [title, setTitle] = useState(props.title)

  function submitItem(text, listsId) {
    const newItem = {
      id: Date.now(),
      text,
      completed: false,
    }
    const data = {
      text: text,
      date: getDate(new Date()),
      completed: false,
      lists_id: listsId,
      users_id: userId,
    }
    props.onAdd(data)
    setItems([...items, newItem])
    setText('')
  }

  function deleteItem(id) {
    setItems(items.filter((item) => item.id !== id))
  }

  function toggleCompleted(id) {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          return { ...item, completed: !item.completed }
        } else {
          return item
        }
      })
    )
  }

  function editTitle(event) {
    const { value } = event.target
    props.editList(props.id, value)
  }

  return (
    <div className={props.className} style={props.style}>
      <div className="box">
        <form className="list">
          <input
            className="title"
            type="text"
            name="text"
            onBlur={editTitle}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="List title.."
            value={title}
          />
          <button className="deleteList" onClick={() => props.deleteList(props.id)}>
            <DeleteIcon sx={{ fontSize: 40 }} />
          </button>
        </form>

        {items.map((item) => (
          <div className="item">
            <TodoItem
              key={item.id}
              item={item}
              deleteItem={(id) => {
                deleteItem(id)
                props.deleteItem(id)
              }}
              toggleCompleted={toggleCompleted}
              editItem={(text, id, persist) => {
                props.editItem(text, id, persist)
                setItems(
                  items.map((item) => {
                    if (item.id == id) {
                      return {
                        ...item,
                        text,
                      }
                    }
                    return item
                  })
                )
              }}
            />
          </div>
        ))}
        <input
          className="newItem"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="add" onClick={() => submitItem(text, props.id)}>
          +
        </button>
      </div>
    </div>
  )
}
export default TodoList
