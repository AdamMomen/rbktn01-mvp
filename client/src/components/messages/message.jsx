import React from "react"
class Message extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        const { messages, user, typingUsers } = this.props
        return (
            <div ref="container" className="thread-container">
                <div className="thread">
                    <div>HELLO Iam here</div>
                    {
                        messages.map((mes) => {
                            return (
                                <div
                                    key={mes.id}
                                    className={`message-container ${mes.sender === user.name && 'right'}`}
                                >
                                    <div className="message">{mes.message}</div>
                                    <div className="name">{mes.sender}</div>

                                </div>
                            )
                        })
                    }
                    {
                        typingUsers.map(name => {
                            return (<div
                                key={name}
                                className="typing-user"
                            >{`${name} is typing . . .`}</div>)
                        })
                    }
                </div>
            </div>
        )
    }
}

export default Message
