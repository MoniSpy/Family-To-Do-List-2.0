import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList } from '@fortawesome/free-solid-svg-icons';

function Logout(){
  console.log("logout");
}

function Header() {
  return (
    <header>
      <div className="header">
        <h1>To Do List </h1>
        {/* <FontAwesomeIcon icon={faList} size="3x" className="listIcon" style={{ paddingTop: '20px' }} /> */}
        <button className="logoutbutt" onClick={() => Logout ()}>Logout</button>
      </div>
    </header>
  );
}

export default Header;