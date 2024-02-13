import React from 'react'
import './navbar.css'
import { useNavigate } from 'react-router-dom';
function Navbar() {
  const navigate = useNavigate();
  return (
    <div id="nav">
      <ul>
        <li id="home" onClick={() => navigate("/movie")}><b>Home</b></li>
        
        <li id="netflix"><b>NETFLIX</b></li>
      </ul>
    </div>
  )
}

export default Navbar
