import React from "react"
class ChatHeading extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        const { name, numberOfUsers } = this.props
        return (
            <div className="chat-header">
                <div className="user-name">{name}</div>
                <div className="status">
                    <div className="indicator">
                        <span>{numberOfUsers ? numberOfUsers : null}</span>
                    </div>
                </div>

            </div>
        )
    }
}
export default ChatHeading
