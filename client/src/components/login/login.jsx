import React from 'react'
import { VERIFY_USER } from '../../events'
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nickname: '',
            error: ""
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.setUser = this.setUser.bind(this)
        this.setError = this.setError.bind(this)
    }
    handleChange(e) {
        this.setState({
            nickname: e.target.value
        })
        e.target.value = ''
    }
    handleSubmit() {
        const { socket } = this.props
        const { nickname } = this.state
        socket.emit(VERIFY_USER, nickname, this.setUser)

    }
    setUser({ user, isUser }) {
        console.log(user, isUser)
        if (isUser) {
            this.setError("User name taken")
        } else {
            this.setError("")
            this.props.setUser(user)
        }
    }
    setError(error) {
        this.setState({ error })
    }

    render() {
        const { nickname, error } = this.state;
        return (
            <div className="login">
                <label htmlFor="nickname"><h2>Got a nickname</h2></label>
                <input
                    ref={(input) => {
                        this.textInput = input
                    }}
                    type="text"
                    id="nickname"
                    value={nickname}
                    onChange={this.handleChange}
                    placeholder={'World Leader'}
                />
                <button onClick={this.handleSubmit}>Submit</button>
                <div className="error">{error ? error : null}</div>

            </div>
        )
    }
}
export default Login
