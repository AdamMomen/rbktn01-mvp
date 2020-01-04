var messages = require('./DB/model/model.js')
messages.insertOne({
    name: 'Adam',
    message: 'Test message'
})