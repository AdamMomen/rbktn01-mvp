import React from "react"
import ReactDOM from 'react-dom'
import Messages from './messages.jsx'
import { json } from "body-parser";
import '../../../styles/index.css'
var io = require('socket.io-client')
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            messages: null,
        }
    }

    render() {
        return (
            <div>
                <Messages />
            </div >

        )
    }
}
ReactDOM.render(<App />, document.getElementById('app'))