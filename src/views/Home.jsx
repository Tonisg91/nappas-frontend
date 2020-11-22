import React from 'react'
import useFecth from '../hooks/useFetch'

function Home() {
    const { data } = useFecth('http://localhost:5000/api/announcements')

    console.log(data)

    return (
        <div>
            <h1>Home view</h1>
        </div>
    )
}

export default Home