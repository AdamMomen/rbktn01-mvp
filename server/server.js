var express = require('express')
var bodyParser = require('body-parser')
var app = express();
var http = require('http').Server(app);
var io = module.exports.io = require('socket.io')(http);

var port = process.env.PORT || 3000
var mongoose = require('mongoose');
var SocketManger = require('./socketManger');
io.on('connection', SocketManger)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('client/dist'))


app.get('/messages', (req, res) => {
    console.log(req.method)
    res.json({ success: true }).sendStatus(200)
})
app.post('/message', (req, res) => {
    io.emit('message', req.body.message)
    res.sendStatus(200)
})
mongoose.connect('mongodb://localhost/chatter-app')

var server = http.listen(port, () => {
    console.log('server is running on port', server.address().port);
});
