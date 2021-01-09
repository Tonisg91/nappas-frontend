import React from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'

export const ChatList = ({ chats, currentUser }) => {
    const history = useHistory()
    const goToChatDetails = (path) => history.push(path)
    console.log(chats)

    const chatList = chats.map((c, idx) => {
        const { guestUser, createdBy, messages } = c

        const displayedName =
            currentUser._id === createdBy._id ? guestUser.name : createdBy.name

        const lastMessage = messages[messages.length - 1].data

        return (
            <div 
                key={c._id} 
                className="chatCard" 
                onClick={() => goToChatDetails(`/chat/${c._id}`)}
                >
                <p key={displayedName}>{displayedName}</p>
                <h1 key={c.title + idx}>{c.announcement.title}</h1>
                <p key={lastMessage}>{lastMessage}</p>
            </div>
        )
    })

    return (
        <>
            <div className="chatNav">
                {chatList}
            </div>
        </>
    )
}

const mapStateToProps = ({ currentUser }) => ({
    currentUser,
    chats: currentUser ? currentUser.chats : []
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(ChatList)
