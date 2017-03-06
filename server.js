var express           = require('express'),
    app               = express();
    bodyParser        = require('body-parser');
   // serverController = require('./server/controllers/servercontroller');
const MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var port = process.argv[2] || 8888;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser());
app.use(express.static(__dirname));

/*MongoClient.connect('mongodb://vahid:vahid@ds151049.mlab.com:51049/data-information', (err, database) => {
	if(err) return console.log(err)
	db = database;
	app.listen(port, function() {
		console.log(`app listening on http://localhost:${port}`);
	});
});*/

/*app.get('/*', function(req, res){
    res.sendFile(__dirname + '/index.html');
});*/

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');	
});
app.use('/js', express.static(__dirname + '/client/js'));
app.post('/api/login', function(req, res){
	res.json({"auth":"ok","status":true});
});

app.get('/api/home', function(req, res){
	res.json({"home":"true"});
});

app.listen(port, function() {
	console.log("app listening on http://localhost:",port);
});