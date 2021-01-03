import React, { useState, useEffect, useRef } from "react"
import { connect } from "react-redux"
import io from "socket.io-client"
import { getChat, addMessage } from "reducers/chats.reducers"

const SOCKET_SERVER_URL = "http://localhost:5000"

const ChatRoom = ({ match, chat, getChat, currentUser, addMessage }) => {
  const [chatId, setChatId] = useState(match.params.roomId)
  const [currentMessages, setCurrentMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")
  const socketRef = useRef()

  useEffect(() => {
    socketRef.current = io.connect(SOCKET_SERVER_URL)
    socketRef.current.emit("join", chatId)

    if (!chat.messages) socketRef.current.emit("getChat", chatId)

    socketRef.current.on("getChat", (m) => {
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

    socketRef.current.on("message", (message) => {
      receivedMessage(message)
    })

    return () => {
      getChat([])
      socketRef.current.disconnect()
    }
  }, [])

  function checkChat() {
    socketRef.current.emit("getChat", match.params.roomId)
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
    socketRef.current.emit("send message", messageObject)
    addMessage({ newMessage, user: currentUser._id })
    setNewMessage("")
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
