const io = require('./server').io
const {
    VERIFY_USER,
    USER_CONNECTED,
    USER_DISCONNECTED,
    LOGOUT,
    COMMUNITY_CHAT,
    MESSAGE_RECIEVED,
    MESSAGE_SENT,
    TYPING
} = require('../client/src/events')
const { createUser, createMessage, createChat } = require('../client/src/factories')

let connectedUsers = {};
let communityChat = createChat()


module.exports = (socket) => {
    console.log(`a user is connected  socket id : ${socket.id}`)
    let sendMessageToChatFromUser;
    let sendTypingFromUser;
    //verify user 
    socket.on(VERIFY_USER, (nickname, callback) => {

        if (isUser(connectedUsers, nickname)) {
            callback({ isUser: true, user: null })
        } else {
            callback({ isUser: false, user: createUser({ name: nickname }) })
        }
    })

    socket.on(USER_CONNECTED, (user) => {
        connectedUsers = addUser(connectedUsers, user)
        socket.user = user;
        sendMessageToChatFromUser = sendMessageToChat(user.name)
        sendTypingFromUser = sendTypingToChat(user.name)
        io.emit(USER_CONNECTED, connectedUsers)
        console.log('connected Users = ', connectedUsers)
    })
    socket.on('disconnect', () => {
        if ("user" in socket) {
            connectedUsers = removeUser(connectedUsers, socket.user.name)
        }
        io.emit(USER_DISCONNECTED, connectedUsers)
        console.log('disconnect!', connectedUsers)
    })
    socket.on(LOGOUT, () => {
        connectedUsers = removeUser(connectedUsers, socket.user.name)
        io.emit(USER_DISCONNECTED, connectedUsers)
        console.log('disconnect!', connectedUsers)
    })

    socket.on(COMMUNITY_CHAT, (callback) => {
        callback(communityChat)
    })
    //add user 
    function addUser(userList, user) {
        var newList = Object.assign({}, userList)
        var username = user.name;
        newList[username] = user;
        return newList

    }

    //remove user 
    function removeUser(userList, username) {
        let newList = Object.assign({}, userList)
        delete newList[username]
        return newList
    }

    //check user 
    function isUser(userList, username) {
        return username in userList;
    }
    function sendMessageToChat(sender) {
        return (chatId, message) => {
            io.emit(`${MESSAGE_RECIEVED}-${chatId}`, createMessage({ message, sender }))
        }
    }
    socket.on(MESSAGE_SENT, ({ chatId, message }) => {
        sendMessageToChatFromUser(chatId, message)
    })
    socket.on(TYPING, ({ chatId, isTyping }) => {
        sendTypingToChat(chatId, isTyping)
    })
    function sendTypingToChat(user) {
        return (chatId, isTyping) => {
            io.emit(`${TYPING}-${chatId}`, { chatId, isTyping })
        }
    }
}
