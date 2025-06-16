import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const BASE_URL = 'http://localhost:3000'

async function Logout(navigate) {
  console.log('logout')
  const response = await axios.get(BASE_URL + '/api/logout')
  console.log(response.data)
  navigate('/')
}

function Header() {
  const navigate = useNavigate()
  return (
    <header>
      <div className="header">
        <h1>To Do List </h1>
        <button className="logoutbutt" onClick={() => Logout(navigate)}>
          Logout
        </button>
      </div>
    </header>
  )
}

export default Header
