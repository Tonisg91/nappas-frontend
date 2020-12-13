import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const useGeoLocation = () => {
    const [coords, setCoords] = useState(null)
    const { search } = useLocation()
    const query = new URLSearchParams(search)

    const replaceQueryStringParams = (lat,lng) => {
        query.append('latitude', lat)
        query.append('longitude', lng)
        window.history.replaceState({}, '', `${window.location.pathname}?${query}`)
    }

    useEffect(() => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(async ({ coords }) => {
                const { latitude, longitude } = coords
                await setCoords({latitude, longitude})
                replaceQueryStringParams(latitude, longitude)
            })
        }
    }, [])

    return coords
}

export default useGeoLocation