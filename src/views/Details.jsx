import React from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'

function Details({match, data}) {
    const history = useHistory()
    const announcementFound = data.find(e => e._id === match.params.id)

    if (!data.length) return (
        <h1>Loading</h1>
    )
    
    const { title, description , photos, createdBy } = announcementFound
    
    //TODO: Crear un caroussel
    //TODO: Crear card para imagen de creador
    //TODO: MOSTRAR MAPA

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

const mapStateToProps = state => {
    return {
        data: state.announcements,
    }
}

export default connect(mapStateToProps)(Details)
