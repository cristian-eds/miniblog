import React from 'react'

import { NavLink } from 'react-router-dom';

//css
import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <nav>
        <NavLink to="/">
            Mini <span>Blog</span> 
        </NavLink>
        <ul>
            <li>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/about">Sobre</NavLink>
            </li>
        </ul>
    </nav>
  )
}

export default Navbar