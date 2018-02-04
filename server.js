const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const port = process.env.PORT

server.listen( port,()=> console.log('Server listening at port ', port) ) 

app.use(express.static('public'));

io.on('connection', (socket)=>{
    console.log('connected socket id', socket.client.id)
  
    // these 4 lines communicates with extenstion
    socket.on('press', val=>{
        console.log('from PI', val)
        io.emit('toExt', val)
    })  
  
    socket.on('toServer',data => {
        console.log('controller msg:', data)
        //socket.emit('clientEvent', 'ahoy namorniku')
        //io.emit('toExt', data)
    })
    socket.on('kbd', (val)=>{
          console.log('kbd', val)

          io.emit('fg',val)
          //io.emit('toExt', val)
    })
    
    socket.on('exttest',(val)=>{
      console.log('from extension', val)
    })
})


// listen for requests :)
/*var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});*/



