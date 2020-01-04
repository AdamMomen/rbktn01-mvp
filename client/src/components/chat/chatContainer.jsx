import React from "react";
import SideBar from './sideBar.jsx';
import Message from "../messages/message.jsx";
import MessageInput from "../messages/MessageInput.jsx";
import ChatHeading from "./ChatHeading.jsx";

const { COMMUNITY_CHAT, MESSAGE_RECIEVED, MESSAGE_SENT, TYPING } = require('../../events')
class ChatContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chats: [],
            activeChat: null
        }
        this.setActiveChat = this.setActiveChat.bind(this)
        this.sendMessage = this.sendMessage.bind(this)
        this.sendTyping = this.sendTyping.bind(this)
        this.resetChat = this.resetChat.bind(this)
        this.addChat = this.addChat.bind(this)
        this.addMessageToChat = this.addMessageToChat.bind(this)
        //complete the binding
    }
    componentDidMount() {
        const { socket } = this.props
        socket.emit(COMMUNITY_CHAT, this.resetChat)
    }
    resetChat(chat) {
        return this.addChat(chat, true)
    }
    addChat(chat, reset) {
        console.log(chat)
        const { socket } = this.props
        const { chats } = this.state
        const newChat = reset ? [chat] : [...chats, chat]
        this.setState({ chats: newChat, activeChat: reset ? chat : this.stateactiveChat })
        //check the spelling
        const messageEvent = `${MESSAGE_RECIEVED}-${chat.id}`
        const typingEvent = `${TYPING}-${chat.id}`

        socket.on(messageEvent, this.addMessageToChat(chat.id))
        socket.on(typingEvent, this.updateTypingInChat(chat.id))

    }
    setActiveChat(activeChat) {
        this.setState({ activeChat })
    }
    addMessageToChat(chatId) {
        return message => {
            const { chats } = this.state
            let newChats = chats.map((chat) => {
                if (chat.id === chatId) {
                    chat.messages.push(message)
                    return chat
                }
                this.setState({ chats: newChats })
            })
        }
    }

    updateTypingInChat(chatId) {
        return ({ isTyping, chatId }) => {
            if (user !== this.props.user.name) {
                const { chats } = this.state
                let newChats = chats.map((chat) => {
                    if (chat.id === chatId) {
                        if (isTyping && !chats.typingUsers.includes(user)) {
                            chat.typingUsers.push(user)
                        } else if (!isTyping && chat.typingUsers.includes(user)) {
                            chat.typingUsers = chat.typingUsers.filter(us => us !== user)
                        }
                    }
                    return chat
                })
                this.setState({
                    chats: newChats
                })
            }
        }
    }

    sendMessage(chatId, message) {
        const { socket } = this.props
        socket.emit(MESSAGE_SENT, { chatId, message })
    }

    sendTyping(chatId, isTyping) {
        const { socket } = this.props
        socket.emit(TYPING, { chatId, isTyping })
    }

    render() {
        const { user, logout } = this.props
        const { chats, activeChat } = this.state
        return (<div className="container">
            <SideBar
                logout={logout}
                chats={chats}
                user={user}
                activeChat={activeChat}
                setActiveChat={this.setActiveChat}
            />
            <div className="chat-room-container">
                {

                    activeChat !== null ? (
                        <div className="chat-room">
                            <ChatHeading name={activeChat.name} />
                            <Message
                                messages={activeChat.messages}
                                user={user}
                                typingUsers={activeChat.typingUsers} />
                            <MessageInput
                                sendMessage={(message) => { this.sendMessage(activeChat.id, message) }}
                                sendTyping={(isTyping) => { this.sendTyping(activeChat.id, isTyping) }}
                            />
                        </div>
                    ) :
                        <div className="chat-room choose">
                            <h3>Choose a chat!</h3>
                        </div>
                }
            </div>
        </div>)
    }
}
export default ChatContainer