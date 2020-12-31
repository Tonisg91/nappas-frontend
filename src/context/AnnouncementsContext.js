import { useState, createContext, useEffect, useCallback, useContext } from 'react'
import axios from '../configs/axios'
import handlerContext from '../context/HandlerContext'


const Context = createContext({})

export function AnnouncementsContextProvider({ children }) {
    const [data, setData] = useState([])
    const handler = useContext(handlerContext)

    const getData = useCallback(async () => {
        try {
            if (!data.length) {
                handler.setLoading(true)
                if (handler.error) return handler.setLoading(false)
                
                const response = await axios.get(`/announcements`)
                setData(response.data)
            }
        } catch (error) {
            handler.setError(error.response ? error.response.data : 'Server Error')
        } finally {
            handler.setLoading(false)
        }
    }, [data, handler])

    useEffect(() => {
        getData()
    }, [getData])



    return <Context.Provider value={{data, setData}}>
        {children}
    </Context.Provider>
}

export default Context