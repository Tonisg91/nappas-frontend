import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
    return (
        <nav>
            <Link to="/search" >Todos los trabajos</Link>
            <Link to="/search/construccion" >Construccion</Link>
            <Link to="/search/jardineria" >Jardineria</Link>
            <Link to="/search/informatica" >Informatica</Link>
            <Link to="/search/mecanica" >Mecánica</Link>
            <Link to="/search/pintura" >Pintura</Link>
            <Link to="/login" >Login</Link>
            <Link to="/signup" >Signup</Link>
            <Link to="/profile" >Profile</Link>
            <Link to="/new-announcement">Agregar anuncio</Link>
        </nav>
    )
}
export default Navbar