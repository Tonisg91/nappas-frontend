import React from 'react'
import { Link } from 'react-router-dom'

function Home() {

    return (
        <div>
            <Link to="/search" >Todos los trabajos</Link>
            <Link to="/search/construccion" >Construccion</Link>
            <Link to="/search/jardineria" >Jardineria</Link>
            <Link to="/search/informatica" >Informatica</Link>
            <Link to="/search/mecanica" >Mecánica</Link>
            <Link to="/search/pintura" >Pintura</Link>
            <h1>Home</h1>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nesciunt, ducimus!</p>
        </div>
    )
}

export default Home