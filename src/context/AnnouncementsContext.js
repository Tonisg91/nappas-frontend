import { useState, createContext, useEffect, useCallback, useContext } from 'react'
import axios from '../configs/axios'
import handlerContext from '../context/HandlerContext'


const Context = createContext({})

export function AnnouncementsContextProvider({ children }) {
    const [announcements, setAnnouncements] = useState(null)
    const handler = useContext(handlerContext)

    const getAnnouncementsData = useCallback(async () => {
        try {
            if (!announcements) {
                handler.setLoading(true)
                if (handler.error) return handler.setLoading(false)

                const announcements = await axios.get(`/announcements`)
                setAnnouncements(announcements.data)
            }
        } catch (error) {
            handler.setError(error.response ? error.response.data : 'Server Error')
        } finally {
            handler.setLoading(false)
        }
    }, [announcements, handler])

    useEffect(() => {
        getAnnouncementsData()
    }, [getAnnouncementsData])



    return <Context.Provider value={{announcements, setAnnouncements}}>
        {children}
    </Context.Provider>
}

export default Context