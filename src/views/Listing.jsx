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
    }, [userCoords])

    // const hasData = data.length > 0

    // useEffect(() => {
    //     if (!hasData) {
    //         axios.get('/announcements').then(res => {
    //             if (res.status < 400) getList(res.data)
    //         }).catch(err => console.log(err))
    //     }
    // }, [hasData])

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
