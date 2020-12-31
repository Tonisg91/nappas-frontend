import { createContext } from 'react'
import { UserContextProvider } from './UserContext'
import { HandlerContextProvider } from './HandlerContext'
import { AnnouncementsContextProvider } from './AnnouncementsContext'


const Context = createContext({})

export function CombineProviders({ children }) {

    return (
    <Context.Provider value={{}}>
        <HandlerContextProvider>
            <UserContextProvider>
                <AnnouncementsContextProvider>
                    { children }
                </AnnouncementsContextProvider>
            </UserContextProvider>
        </HandlerContextProvider>
    </Context.Provider>)
}

export default Context