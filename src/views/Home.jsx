import React from 'react'
import { Link } from 'react-router-dom'

function Home() {

    return (
        <div>
            <Link to="/search" >Todos los trabajos</Link>
            <Link to="/search/construction" >Construccion</Link>
            <Link to="/search/informatica" >Informatica</Link>
            <h1>Home</h1>
        </div>
    )
}

export default Home