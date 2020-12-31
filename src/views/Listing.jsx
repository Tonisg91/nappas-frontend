import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { useGeoLocation } from '../hooks'
import { getCoordinates } from '../reducers/coordinates.reducer'
import { AnnouncementCard } from '../components'
import ReactGa from 'react-ga'

function Listing({data, coordinates, getCoordinates}) {
    const { category } = useParams()
    const userCoords = useGeoLocation()
    
    useEffect(() => {
        ReactGa.pageview('/listing')
        if (!coordinates) getCoordinates(userCoords)
    }, [userCoords, coordinates, getCoordinates])

    const filteredAnnouncementByCategory = data.filter(ad => ad.category === category)

    const displayAnnouncements = (arrToDisplay) => {
        return (
            arrToDisplay.map((ad, idx) => (
                    <AnnouncementCard
                        key={ad._id + idx}
                        id={ad._id}
                        title={ad.title}
                        photoCard={ad.photoCard}
                    />
                )
            )
        )
    }

    return (
        //TODO: ARREGLAR ESTILOS
        <div style={{display: 'flex'}} >
            <Link to="/">Home</Link>
            <h1>Listing {category} items</h1>
            { category ?  
                displayAnnouncements(filteredAnnouncementByCategory) :
                displayAnnouncements(data)
            }
        </div>
    )
}

const mapStateToProps = state => {
    return {
        data: state.announcements,
        coordinates: state.coordinates
    }
}

const mapDispatchToProps = dispatch => ({
    getCoordinates: (coords) => {
        dispatch(getCoordinates(coords))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(Listing)
