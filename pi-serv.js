const Gpio = require('onoff').Gpio,
  up    = new Gpio(22,'in', 'both'),
  down  = new Gpio(27,'in', 'both'),
  left  = new Gpio( 4,'in', 'both'),
  right = new Gpio(17,'in', 'both'),
  enter = new Gpio(23,'in', 'both')



const app = require('express')()
const express = require('express')
const http = require('http').Server(app)
var io = require('socket.io')(http)
const iog = require('socket.io-client')
const socketg = iog.connect('https://even.glitch.me/')//, {reconnection: true})


let enterT, upT, downT, leftT, rightT

let enterGate = false
let upGate = false
let downGate = false
let leftGate = false
let rightGate = false
    
console.log(enterGate, upGate, downGate, leftGate, rightGate)

app.use(express.static('public'))
app.get('/',(req, res)=>{
     res.sendFile(__dirname + '/index.html')
})


http.listen(3050,()=>{
     console.log('listening on *:3050');
});

//to glitch server
socketg.on('connect',()=>{
     console.log('sog connected')

     left.watch(function (err, val) {
		  if (err) throw err
		  //console.log('left',val, leftGate)

			  if (!leftGate && val) {
					leftGate = true
					console.log('> left')
					socketg.emit('press','left')

					setTimeout(()=>{
						leftGate = false
					}, 50)
			  }	    
     })
     right.watch(function (err, val) {
		  if (err) throw err
		  //console.log('right',val, rightGate)

			  if (!rightGate && val) {
					rightGate = true
					console.log('> right')
					socketg.emit('press','right')

					setTimeout(()=>{
						rightGate = false
					}, 50)
			  }	    
     })
     up.watch(function (err, val) {
		  if (err) throw err
		  //console.log('up',val, upGate)

			  if (!upGate && val) {
					upGate = true
					console.log('> up')
					socketg.emit('press','up')

					setTimeout(()=>{
						upGate = false
					}, 50)
			  }
     })
     down.watch(function (err, val) {
		  if (err) throw err
		  //console.log('down',val, downGate)

			  if (!downGate && val) {
					downGate = true
					console.log('> down')
					socketg.emit('press','down')

					setTimeout(()=>{
						downGate = false
					}, 50)
			  }	    
     })
     enter.watch(function (err, val) {
		  if (err) throw err
		  //console.log('enter',val, enterGate)

			  if (!enterGate && val) {
					enterGate = true
					console.log('> enter')
					socketg.emit('press','enter')

					setTimeout(()=>{
						enterGate = false
					}, 50)
			  }	    
     })     
     
     /*socketg.on('clientEvent', data =>{
          console.log('glitch server says:', data)
     })*/
})



/*process.on('SIGINT', function () {
  
  //enter.unexport();
})*/
