import { useState, useEffect } from 'react'
import axios from '../configs/axios'

const useFecth = url => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])

    useEffect(() => {
        if (!url) return

        axios.get(url)
        .then(res => {
            setData(res.data)
            setLoading(false)
        })
        .catch(err => console.error(err))
    }, [url])

    return { loading, data }
}

export default useFecth