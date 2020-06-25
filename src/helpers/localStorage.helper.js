const { localStorage } = window

export const getMessages = () => {
  const messages = localStorage.getItem('messages')
  return isValidJson(messages) ?
    JSON.parse(messages) : []
}

export const saveMessages = messagesArray => {
  const storedMessages = getMessages()
  localStorage.setItem('messages', JSON.stringify([ ...storedMessages, messagesArray ]) )
}

const isValidJson = json => {
  try {
    JSON.parse(json)
  }
  catch(e) {
    return false
  }
  return true
}