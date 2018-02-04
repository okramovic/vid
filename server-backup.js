var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
const port = process.env.PORT

server.listen( port, function () {
  console.log('Server listening at port ', port);
}); 

app.use(express.static('public'));
/*app.get("/", function (request, response) {
  console.log('request')
  response.sendFile(__dirname + '/views/index.html');
});*/



io.on('connection', (socket)=>{
    console.log('connected socket id', socket.client.id)
    socket.on('toServer',data => {
        console.log('controller msg:', data)
        //socket.emit('clientEvent', 'ahoy namorniku')
        io.emit('toExt', data)
    })
    socket.on('kbd', (val)=>{
          console.log('kbd', val)

          io.emit('fg',val)
          //io.emit('toExt', val)
    })
    socket.on('color',(col)=>{
      
      //console.log(col)
      io.emit('color',col)
    })
    socket.on('exttest',(val)=>{
      console.log('from extension', val)
    })
})


// listen for requests :)
/*var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});*/



