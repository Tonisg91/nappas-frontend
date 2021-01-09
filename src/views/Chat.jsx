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
    const [currentMessages, setCurrentMessages] = useState(chat.messages || [])
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

            socketRef.emit('join', chatId)
    
            if (!chat.messages) checkChat()

            socketRef.on('getChat', (m) => {
                console.log('RECEIVE CHAT DATA')
                getChat(m)
                setCurrentMessages([...m.messages])
            })
        


        // socketRef.on('your id', (id) => {
        //     setYourId(id)
        // })
        // checkChat()

        // socketRef.on('join', (body) => {
        //     setChatId(body)
        // })

        // socketRef.on('message', (message) => {
        //     receivedMessage(message)
        // })

        // return () => {
        //     getChat([])
        //     socketRef.disconnect()
        // }
    }, [])
    
    function checkChat() {
        socketRef.emit('getChat', chatId)
    }
    function receivedMessage(message) {
        addMessage(message)
    }

    function sendMessage(e) {
        e.preventDefault()
        const messageObject = {
            msg: {
                data: newMessage,
                user: currentUser._id
            },
            chatId: chatId
        }
        socketRef.emit('send message', messageObject)
        addMessage({ newMessage, user: currentUser._id })
        setNewMessage('')
    }

    return (
        <>
            <h1>CHAT</h1>
            <input
                value={newMessage}
                type="text"
                onChange={({ target }) => setNewMessage(target.value)}
            />
            {currentMessages.map((m, idx) => {
                return <h4 key={m.data + idx}>{m.data}</h4>
            })}
            <button onClick={sendMessage}>SEND MESSAGE</button>
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
