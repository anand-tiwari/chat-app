var express           = require('express'),
    app               = express();
    bodyParser        = require('body-parser');
   // serverController = require('./server/controllers/servercontroller');
const MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var port = process.argv[2] || 8888;
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser());

server.listen(port, function(){
	console.log("server listening on: http://localhost:%s",port);
});

app.use('/js', express.static(__dirname + '/client/js'));
app.post('/api/login', function(req, res){
	res.json({"auth":"ok","status":true});
});

app.get('/api/home', function(req, res){
	res.json({"home":"true"});
});

/*app.listen(port, function() {
	console.log("app listening on http://localhost:",port);
});
*/
app.get('/*', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

var usernames = {};
var rooms = [];

io.sockets.on('connection', function (socket) {
    socket.on('adduser', function (data) {
        var username = data.username;
        var room = data.room;
 
        if (rooms.indexOf(room) != -1) {
            socket.username = username;
            socket.room = room;
            usernames[username] = username;
            socket.join(room);
            socket.emit('updatechat', 'SERVER', 'You are connected. Start chatting');
            socket.broadcast.to(room).emit('updatechat', 'SERVER', username + ' has connected to this room');
        } else {
            socket.emit('updatechat', 'SERVER', 'Please enter valid code.');
        }
    });
     
    socket.on('createroom', function (data) {
        var new_room = ("" + Math.random()).substring(2, 7);
        rooms.push(new_room);
        data.room = new_room;
        socket.emit('updatechat', 'SERVER', 'Your room is ready, invite someone using this ID:' + new_room);
        socket.emit('roomcreated', data);
    });
 
    socket.on('sendchat', function (data) {
        io.sockets.in(socket.room).emit('updatechat', socket.username, data);
    });
 
    socket.on('disconnect', function () {
        delete usernames[socket.username];
        io.sockets.emit('updateusers', usernames);
        if (socket.username !== undefined) {
            socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' has disconnected');
            socket.leave(socket.room);
        }
    });
});


/*MongoClient.connect('mongodb://vahid:vahid@ds151049.mlab.com:51049/data-information', (err, database) => {
	if(err) return console.log(err)
	db = database;
	app.listen(port, function() {
		console.log(`app listening on http://localhost:${port}`);
	});
});*/
