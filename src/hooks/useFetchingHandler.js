import { useState } from 'react'

const useFetchingHandler = () => {
    const [loading, setLoading] = useState(false)
    const [hasError, setHasError] = useState(false)

    return { loading, setLoading, hasError, setHasError }
}

export default useFetchingHandler
