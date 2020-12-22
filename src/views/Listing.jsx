import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import useGeoLocation from '../hooks/useGeoLocation'
import { getCoordinates } from '../reducers/coordinates.reducer'
import { AnnouncementCard } from '../components'

function Listing({data, coordinates, getCoordinates}) {
    const { category } = useParams()
    const userCoords = useGeoLocation()

    useEffect(() => {
        if (!coordinates) getCoordinates(userCoords)
    }, [userCoords, coordinates, getCoordinates])

    const displayAnnouncements = data.map((ad, idx) => (
        <AnnouncementCard 
            key={ad._id + idx}
            id={ad._id}
            title={ad.title}
            photoCard={ad.photoCard}
        />
    ))

    return (
        <div style={{display: 'flex'}} >
            <Link to="/">Home</Link>
            <h1>Listing {category} items</h1>
            {displayAnnouncements}
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
