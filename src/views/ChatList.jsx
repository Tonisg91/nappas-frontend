import React from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { getChat } from 'reducers/chats.reducers'

export const ChatList = ({ chats, currentUser, getChat }) => {
    const history = useHistory()
    const goToChatDetails = (path, chat) => {
        getChat(chat)
        history.push(path)
    }
    // TODO: COMPONENT FOR CHATLIST
    const chatList = chats.map((c, idx) => {
        const { guestUser, createdBy, messages } = c

        const displayedName =
            currentUser._id === createdBy._id ? guestUser.name : createdBy.name

        const lastMessage = messages[messages.length - 1].data

        return (
            <div 
                key={c._id} 
                className="chatCard" 
                onClick={() => goToChatDetails(`/chat/${c._id}`, c)}
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

const mapDispatchToProps = (dispatch) => ({
    getChat: (chatData) => dispatch(getChat(chatData))
})

export default connect(mapStateToProps, mapDispatchToProps)(ChatList)
