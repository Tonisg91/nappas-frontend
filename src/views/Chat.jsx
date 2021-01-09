import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { getChat, addMessage } from 'reducers/chats.reducers'
import { getSocketRef } from 'reducers/socket.reducer'

const ChatRoom = ({
    match,
    chat,
    getChat,
    currentUser,
    addMessage,
    socketRef,
    getSocketRef
}) => {
    const [chatId] = useState(match.params.roomId)
    const [flag, setFlag] = useState(false)
    const [newMessage, setNewMessage] = useState('')

    useEffect(() => {
        if (!socketRef) {
            import('socket.io-client').then((io) => {
                const socket = io.connect('http://localhost:5000')
                getSocketRef(socket)
            })
        }
    }, [])

    useEffect(() => {
        if (!socketRef) return
        
        if (!chat.length) checkChat()
        
        socketRef.emit('join', chatId)
        
        socketRef.on('getChat', getChatDataToState)
        
        socketRef.on('message', receivedMessage)
    }, [flag])
    
    function checkChat() {
        socketRef.emit('getChat', chatId)
    }
    
    function getChatDataToState(m) {
        getChat(m)
    }

    function receivedMessage (message) {
        addMessage(message)
        setFlag(false)
    }

    function sendMessage(e) {
        e.preventDefault()
        setFlag(true)
        const messageObject = {
            msg: {
                data: newMessage,
                user: currentUser._id
            },
            chatId: chatId
        }
        socketRef.emit('send message', messageObject)
        addMessage(messageObject.msg)
        setNewMessage('')
    }

    

    return (
        <>
            <h1>CHAT</h1>
            {chat.messages && chat.messages.map((m, idx) => {
                return <h4 key={m.data + idx}>{m.data}</h4>
            })}
            <form onSubmit={sendMessage} >
                <input
                    value={newMessage}
                    type="text"
                    onChange={({ target }) => setNewMessage(target.value)}
                />
                <button onFocus={this} >SEND MESSAGE</button>
            </form>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser,
        chat: state.chat,
        socketRef: state.socket
    }
}

const mapDispatchToProps = (dispatch) => ({
    getChat: (chatData) => {
        dispatch(getChat(chatData))
    },
    addMessage: (msg) => {
        dispatch(addMessage(msg))
    },
    getSocketRef: (socket) => {
        dispatch(getSocketRef(socket))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom)
