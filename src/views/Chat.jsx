import React, { useState, useEffect, useRef } from "react"
import io from 'socket.io-client'

const NEW_CHAT_MESSAGE_EVENT = "newChatMessage"
const SOCKET_SERVER_URL = "http://localhost:5000"

const ChatRoom = ({match}) => {
    const [yourId, setYourId] = useState(null)
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState('')
    const socketRef = useRef()

    useEffect(() => {
        socketRef.current = io.connect(SOCKET_SERVER_URL)

        socketRef.current.on('your id', (id) => {
            setYourId(id)
        })

        socketRef.current.on('message', (message = newMessage) => {
            receivedMessage(message)
        })
    }, [])

    function receivedMessage(message) {
        setMessages(oldMsgs => [...oldMsgs, message])
    }

    function sendMessage(e) {
        e.preventDefault()
        const messageObject = {
            body: newMessage,
            id: yourId
        }
        setNewMessage('')
        socketRef.current.emit('send message', messageObject)
    }

    

   return (
       <>
        <h1>CHAT</h1>
        <input 
            type="text" 
            onChange={({target}) => setNewMessage(target.value)}
        />
        {   
            messages.map((m,idx) => {
                return (
                    <h4 style={{color: m.id === yourId ? 'blue' : 'red'}}>{m.body}</h4>
                )
            })
        }
        <button onClick={sendMessage}>SEND MESSAGE</button>
       </>
   )
};

export default ChatRoom;