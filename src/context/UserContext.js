import { useState, createContext, useEffect, useCallback, useContext } from 'react'
import axios from '../configs/axios'
import tokenService from '../utils/tokenService'
import handlerContext from '../context/HandlerContext'

const Context = createContext({})

export function UserContextProvider ({children}) {
    const [currentUser, setCurrentUser] = useState(null)
    const handler = useContext(handlerContext)

    const getUserData = useCallback(async () => {
        try {
            if (!currentUser) {
                handler.setLoading(true)
                if (handler.error) return handler.setLoading(false)

                if (!tokenService.compareTokenTime()) return
                const user = await axios.get(`/users/${tokenService.getUserId()}`)
                setCurrentUser(user.data)
            }
        } catch (error) {
            handler.setError(error.response ? error.response.data : 'Server Error')
        } finally {
            handler.setLoading(false)
        }
    }, [currentUser, handler])

    useEffect(() => {
        getUserData()
    }, [getUserData])
    
    return <Context.Provider value={{ currentUser, setCurrentUser }}>
        {children}
    </Context.Provider>
}

export default Context