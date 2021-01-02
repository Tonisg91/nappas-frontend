import React, { useState, useEffect, useRef } from "react"
import { connect } from 'react-redux'
import io from 'socket.io-client'

//const NEW_CHAT_MESSAGE_EVENT = "newChatMessage"
const SOCKET_SERVER_URL = "http://localhost:5000"

const ChatRoom = ({ match, chat }) => {

    console.log(chat)

    //const [chatId, setChatId] = useState()
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState('')
    const socketRef = useRef()
    
    useEffect(() => {
        socketRef.current = io.connect(SOCKET_SERVER_URL)
        console.log(socketRef)

        // socketRef.current.on('your id', (id) => {
        //     setYourId(id)
        // })
        // checkChat()

        // socketRef.current.on('join', (body) => {
        //     setChatId(body)
        // })

        socketRef.current.on('message', (message = newMessage) => {
            receivedMessage(message)
        })
    }, [])


    // function checkChat() {
    //     const body = {
    //         createdBy,
    //         guestUser
    //     }
    //     socketRef.current.emit('checkChat', body)
    // }

    function receivedMessage(message) {
        console.log(message)
        setMessages(oldMsgs => [...oldMsgs, message])
    }

    function sendMessage(e) {
        // e.preventDefault()
        // const messageObject = {
        //     body: {
        //         newMessage,
        //         guestUser
        //         },
        //     chatId: chatId
        // }
        // socketRef.current.emit('send message', messageObject)
        // setNewMessage('')
    }

    

   return (
       <>
        <h1>CHAT</h1>
        <input 
            type="text" 
            onChange={({target}) => setNewMessage(target.value)}
        />
        {   
            messages.map((m) => {
                return (
                    <h4 >{m.body.newMessage}</h4>
                )
            })
        }
        <button onClick={sendMessage}>SEND MESSAGE</button>
       </>
   )
};

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser,
        chat: state.chat
    }
}

export default connect(mapStateToProps, null)(ChatRoom)