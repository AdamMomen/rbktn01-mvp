const uuidv4 = require('uuid/v4');
const createUser = ({ name = "" } = {}) =>
    (
        {
            id: uuidv4(),
            name
        }
    )


//create messages
const createMessage = ({ message = "", sender = "" } = {}) => (
    {
        id: uuidv4(),
        time: new Date(Date.now()),
        message,
        sender
    }
)


const createChat = ({ messages = [], name = "Community", users = [], typingUsers = [] } = {}) => (
    {

        id: uuidv4(),
        name,
        messages,
        users,
        typingUsers
    }
)
const getTime = (data) => {
    return `${date.getHours()}:${"0" + date.getMinutes().slice(-2)}`
}
module.exports = {
    createUser,
    createMessage,
    createChat
}