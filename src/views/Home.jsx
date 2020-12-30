import React, { useContext } from 'react'
import AnnouncementsContext from '../context/AnnouncementsContext'
import UserContext from '../context/UserContext'
import handlerContext from '../context/HandlerContext'

function Home() {
    const currentUser = useContext(UserContext)
    const announcements = useContext(AnnouncementsContext)
    const handler = useContext(handlerContext)
    
    
    if (handler.loading) {
      return (
        <h1>Loading data</h1>
      )
    }

    if (handler.error) {
      return (
        <h1>{handler.error}</h1>
      )
    }
    return (
        <div>
            <h1>{currentUser.photo}</h1>
            <h1>Home</h1>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nesciunt, ducimus!</p>
        </div>
    )
}

export default Home