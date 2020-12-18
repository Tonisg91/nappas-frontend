import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import useGeoLocation from '../hooks/useGeoLocation'
import { getCoordinates } from '../reducers/coordinates.reducer'

function Listing({data, coordinates, getCoordinates}) {
    const { category } = useParams()
    const userCoords = useGeoLocation()

    useEffect(() => {
        if (!coordinates) getCoordinates(userCoords)
    }, [userCoords, coordinates, getCoordinates])

    return (
        <div>
            <Link to="/">Home</Link>
            <h1>Listing {category} items</h1>
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
