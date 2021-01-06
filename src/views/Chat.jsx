import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { getChat, addMessage } from 'reducers/chats.reducers'

const ChatRoom = ({ match, chat, getChat, currentUser, addMessage, socketRef }) => {
    const [chatId, setChatId] = useState(match.params.roomId)
    const [currentMessages, setCurrentMessages] = useState([])
    const [newMessage, setNewMessage] = useState('')


    useEffect(() => {
        socketRef.emit('join', chatId)

        if (!chat.messages) socketRef.emit('getChat', chatId)

        socketRef.on('getChat', (m) => {
            getChat(m)
            setCurrentMessages([...m.messages])
        })

        // socketRef.current.on('your id', (id) => {
        //     setYourId(id)
        // })
        // checkChat()

        // socketRef.current.on('join', (body) => {
        //     setChatId(body)
        // })

        socketRef.on('message', (message) => {
            receivedMessage(message)
        })

        return () => {
            getChat([])
            socketRef.disconnect()
        }
    }, [])

    function checkChat() {
        socketRef.emit('getChat', match.params.roomId)
    }

    function receivedMessage(message) {
        addMessage(message)
    }

    function sendMessage(e) {
        e.preventDefault()
        const messageObject = {
            msg: {
                data: newMessage,
                user: currentUser._id,
            },
            chatId: chatId,
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
                return <h4 key={m.newMessage + idx}>{m.newMessage}</h4>
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
})

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom)
