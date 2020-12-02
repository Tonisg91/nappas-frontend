import React from 'react'
import useFecth from '../hooks/useFetch'
import useFetch from '../hooks/useFetch'

function Details({match}) {
    
    const { data } = useFecth('http://localhost:5000/api/announcements/' + match.params.id)

    return (
        <div>
            <h1>Details view</h1>
        </div>
    )
}

export default Details
