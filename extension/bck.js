//  scoket 203 cdn  https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.0.3/socket.io.js
console.log('bck script says hi');
const socket = io('https://even.glitch.me')

const madeFor = ['youtube.com/watch','soundcloud.com', 'hovercraft.glitch.me']

socket.emit('exttest', 'shuba-dooba')
let Gport
let openTabIds = []
let lastTabId
/*socket.on('toExt', val =>{
     console.log( val )

     // two ways
     //        either use parcel or similar to bundle together socket.io.js and content.js so socket can be used there
     //        or send values to content.js and see how fast it reacts
     
})*/
/*socket.on('toExt', val =>{
     console.log( val )
     //Gport.postMessage({key: val})
})*/
chrome.tabs.onActivated.addListener(obj=>{
          console.log('onActivated', obj, obj.tabId)

          if (obj.tabId && openTabIds.some(id=> obj.tabId === id)===true) {
               console.log('setting active TAB')
               lastTabId = obj.tabId
          }
})
chrome.tabs.onUpdated.addListener( (tabId, changeInfo, tab)=>{
          //console.log('onUpdated', tabId, changeInfo, tab)

          if (changeInfo.status && changeInfo.status === 'complete'){

               if (tab.active && tab.url && madeFor.some(url=>tab.url.includes(url) === true) ){
                    console.log('will save', tabId, tab.url)
                    openTabIds.push(tabId)
                    console.log('  setting active TAB')
                    lastTabId = tabId

               } else if ( tab.active && tab.url && madeFor.some(url=>tab.url.includes(url) === false) )
                    console.log('not for', tab.url)
          }
})

chrome.runtime.onMessage.addListener((request, sender, sendResponse)=>{

          console.log('request',  request)
          console.log('sender', sender)
          if (request ==='ownId'){
               //sender.tab.id
               chrome.tabs.sendMessage(sender.tab.id, {ownId: sender.tab.id})
          }
          if (request =='shouldActivate'){
               //if (request.tab)

               chrome.tabs.query({lastFocusedWindow:true, active:true}, (tabs)=>{  // or currentWindow ?
                    console.log('tabs', tabs)

                    chrome.tabs.sendMessage(tabs[0].id, tabs[0].url)
               })  
          }
})


chrome.runtime.onConnect.addListener(function(port) {
     console.log('port name', port.name, port) // port.sender.tab.id
     Gport = port

     socket.on('toExt', val =>{
          console.log('val', val )

          // send it directly to only last active tab
          port.postMessage({lastTabId, val})
     })


})