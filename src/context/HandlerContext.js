import { createContext, useState } from 'react'

const Context = createContext({})

export function HandlerContextProvider ({children}) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    return <Context.Provider value={{loading, setLoading, error, setError}}>
        {children}
    </Context.Provider>
}

export default Context