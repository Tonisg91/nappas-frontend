import { useState, useEffect, useCallback } from 'react'
import axios from '../configs/axios'

const useFecth = url => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])

    const fetchData = useCallback(async () => {
        try {
            const { data } = await axios.get(url)

            setData(data)
            setLoading(false)
        } catch (error) {
            console.error(error)
        }
    }, [url])



    useEffect(() => {
        if (!url) return
        fetchData()
    }, [fetchData, url])

    return { loading, data }
}

export default useFecth