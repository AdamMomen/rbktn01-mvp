var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/chatter-app')

var Message = mongoose.model('Message', mongoose.Schema({
    name: String,
    message: String
}))




function findall(callback) {
    Message.find({}, (err, data) => {
        if (err) {
            callback(err, null)
        }
        callback(null, data)
    })
}

function insertOne(data, callback) {
    Message.create(data)
        .then(result => {
            callback(null, result)
        }).catch(err => {
            callback(err, null)
        })
}
exports.findall = findall;
exports.insertOne = insertOne;
