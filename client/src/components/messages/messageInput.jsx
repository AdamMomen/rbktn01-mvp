import React from "react"
class MessageInput extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            message: "",
            isTyping: false
        };
        this.handleSubmit = this.handleSubmit.bind(this)
        this.sendMessage = this.sendMessage.bind(this)
        this.stopCheckingTyping = this.stopCheckingTyping.bind(this)
        this.startCheckingTyping = this.startCheckingTyping.bind(this)
        this.sendTyping = this.sendTyping.bind(this)
    }

    componentWillUnmount() {
        this.sendTyping();
    }

    handleSubmit() {
        this.sendMessage()
        this.setState({ message: "" })
    }
    sendMessage() {
        this.props.sendMessage(this.state.message)
    }
    startCheckingTyping() {
        console.log("Typing");
        this.typingInterval = setInterval(() => {
            if ((Date.now() - this.lastUpdateTime) > 300) {
                this.setState({ isTyping: false })
                this.stopCheckingTyping()
            }
        }, 300)
    }
    stopCheckingTyping() {
        console.log("Stop Typing");
        if (this.typingInterval) {
            clearInterval(this.typingInterval)
            this.props.sendTyping(false)
        }
    }
    sendTyping() {
        this.lastUpdateTime = Date.now()
        if (!this.state.isTyping) {
            this.setState({ isTyping: true })
            this.props.sendTyping(true)
            this.startCheckingTyping()
        }
    }
    render() {
        const { message } = this.state
        return (
            <div className="message-input">

                <div className="message-form">
                    <input
                        id="message"
                        ref={"messageinput"}
                        type="text"
                        className="form-control"
                        value={message}
                        autoComplete={'off'}
                        placeholder="Type something interesting"
                        onKeyUp={e => { e.keyCode !== 13 && this.sendTyping() }}
                        onChange={
                            ({ target }) => {
                                this.setState({ message: target.value })
                            }
                        }
                    />
                    <button
                        disabled={message.length < 1}
                        onClick={this.handleSubmit}
                        className="send"
                    > Send </button>
                </div>
            </div>
        )
    }
}
export default MessageInput
