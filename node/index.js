var express = require("express"),redis = require('redis'),socketio=require('socket.io');
var app = express();
var port = 3700;
var pub=redis.createClient();
var sub=redis.createClient();

var io = socketio.listen(app.listen(port));

app.set('views', __dirname + '/tmpl');
app.set('view engine', "jade");
app.engine('jade', require('jade').__express);
app.use(express.static(__dirname + '/public'));

 
app.get("/", function(req, res){
    res.render("page");
});


io.sockets.on('connection', function (socket) {
    socket.emit('message', { message: 'welcome to the chat' });

    socket.on('send', function (data) {
        io.sockets.emit('message', {message: data.message});    	
    	pub.publish("pubsubNode",data.message);
    });
});


sub.on("subscribe",function(channel,count){
	pub.publish("pubsub","Ping1");
})

sub.subscribe("pubsubEscala");


sub.on("message",function (channel,message) {
	io.sockets.emit('message', {message: message});	
});





