import { useState, useEffect, useCallback, useMemo } from 'react'
import { useLocation } from 'react-router-dom'

const useGeoLocation = () => {
    const { search } = useLocation()
    const [coords, setCoords] = useState(search)
    const query = useMemo(() => new URLSearchParams(search), [search])

    const replaceQueryStringParams = useCallback((lat, lng) => {
        query.append('latitude', lat)
        query.append('longitude', lng)
        window.history.replaceState({}, '', `${window.location.pathname}?${query}`) 
    }, [query])
    

    useEffect(() => {
        if (search) return
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(({ coords }) => {
                const { latitude, longitude } = coords
                setCoords({latitude, longitude})
                replaceQueryStringParams(latitude, longitude)
            })
        }
    }, [search, replaceQueryStringParams])

    return coords
}

export default useGeoLocation