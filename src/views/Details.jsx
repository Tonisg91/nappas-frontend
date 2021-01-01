import React from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'

function Details({match, data, currentUser}) {
    const history = useHistory()
    const announcementFound = data.find(e => e._id === match.params.id)

    if (!data.length) return (
        <h1>Loading</h1>
    )
    
    const { title, description = 'Vacío', photos, createdBy } = announcementFound

    const goChat = () => {
        history.push({
            pathname: `/chat/${title}`,
            search: `?guestUser=${currentUser._id}&createdBy=${createdBy._id}`
        })
    }
    
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
            <button onClick={goChat}  >Enviar mensaje</button>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        data: state.announcements,
        currentUser: state.currentUser,
    }
}

export default connect(mapStateToProps)(Details)
