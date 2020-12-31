import React from 'react'
import ReactGa from 'react-ga'

function Home() {
    ReactGa.pageview('/home')
    return (
        <div>
            <h1>Home</h1>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nesciunt, ducimus!</p>
        </div>
    )
}

export default Home