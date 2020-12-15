import { useState } from 'react'

const useFetchingHandler = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    return { loading, setLoading, error, setError}
}

export default useFetchingHandler