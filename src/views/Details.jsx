import React from 'react'
import useFecth from '../hooks/useFetch'
import { useHistory } from 'react-router-dom'

function Details({match}) {
    const history = useHistory()
    const { data } = useFecth('http://localhost:5000/api/announcements/' + match.params.id)

    console.log(data)

    const { title, description = 'Vacío', photos, createdBy } = data

    //TODO: Crear un caroussel
    //TODO: Crear card para imagen de creador


    return (
        <div>
            <img src={photos} alt={title + 'images'}/>
            <h1>{title}</h1>
            <p>{description}</p>
            <p 
                onClick={() => history.push(`/user/${createdBy._id}`)}
                style={{cursor: 'pointer'}}
                >        
            Creador</p>
        </div>
    )
}

export default Details
