import { useState, useEffect } from 'react'

const useFecth = url => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])

    const fetchData = async () => {
        const response = await fetch(url)
        const data = await response.json()
        setData(data)
        setLoading(loading)
    }

    useEffect(() => {
        fetchData()
    }, [])

    return { loading, data }
}

export default useFecth