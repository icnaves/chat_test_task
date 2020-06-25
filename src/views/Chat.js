import React, { useState, useEffect, useRef } from 'react'
import {
  getMessages,
  saveMessages
} from '../helpers/localStorage.helper'
import './Chat.scss'

const Chat = () => {

  const messagesBoxRef = useRef(null)
  const [isUsernameFilled, setIsUsernameFilled] = useState('')
  const [username, setUsername] = useState('')
  const [message, setMessage] = useState('')
  const [storedMessages, setStoredMessages] = useState([])

  useEffect(() => {
    const _messages = getMessages()
    setStoredMessages(_messages)
    messagesBoxRef.current && messagesBoxRef.current.scrollIntoView({ behavior: "smooth" })
  }, [message])

  useEffect(() => {
    messagesBoxRef.current && messagesBoxRef.current.scrollIntoView({ behavior: "smooth" })
  }, [storedMessages])

  const handleSubmitMessage = e => {
    e.preventDefault()
    saveMessages({ text: message, username })
    setMessage('')
  }

  const handleSubmitUsername = e => {
    e.preventDefault()
    setIsUsernameFilled(true)
  }

  return (
    <div className="container">

      { isUsernameFilled ?
        <form
          onSubmit={handleSubmitMessage}
          className=""
        >
          <div className="messages">
            { storedMessages.map((mes, i) => 
              <div
              key={i}
                className={`d-flex align-items-center messages__item ${mes.username === username ? 'outbound' : 'inbound'}`}
              >
                <div className="messages__text">
                  { mes.text }
                </div>
              </div>
            ) }
            <div ref={messagesBoxRef} />
          </div>
          <div className="form-group">
            <label htmlFor="username">Type message</label>
            <input
              type="text"
              className="form-control"
              id="message"
              value={ message }
              onChange={ ({ target: { value } }) => setMessage(value) }
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={ message.length < 1 }
          >
            Send
          </button>
        </form>
        :
        <form
          onSubmit={handleSubmitUsername}
        >
          <div className="form-group">
            <label htmlFor="username">Type your name</label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={ username }
              onChange={ ({ target: { value } }) => setUsername(value) }
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={ username.length < 1 }
          >
            Save
          </button>
        </form>
      }
    </div>
  );
}

export default Chat;
