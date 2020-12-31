import { useContext } from 'react'
import UserContext from 'context/UserContext'

export default function useUser() {
    const { currentUser, setCurrentUser } = useContext(UserContext)

    return { currentUser, setCurrentUser }
}