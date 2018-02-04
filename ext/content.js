console.info('CONTENT SCRIPT SAYS HI')
const port = chrome.runtime.connect({name: window.location.origin})
let ownId
//let tabActive
//  https://learn.jquery.com/events/triggering-event-handlers/


$(function(){
     
     // send msg for own id
     chrome.runtime.sendMessage('ownId', function(response) {
          console.log('response',response)
     })
     chrome.runtime.onMessage.addListener((req, sender, sendResponse)=>{
          console.log('set ownId response',req, sender)
          if (req.ownId) {
               console.log('setting ownId', req.ownId)
               ownId = req.ownId
          }
     })

     console.info('jquery SAYS HI', window.location.host)
     var click = document.createEvent("HTMLEvents");
     click.initEvent("click", true, true);

     
     port.onMessage.addListener( msg =>{
          console.log('pressed', msg, msg.val)
          
          //simulateKeyPress(msg.key)
          if (msg.lastTabId && ownId === msg.lastTabId){
               console.log('lastTabId fits')
               const key = msg.val
          
               if  (window.location.host.includes('youtube.com')){

                         // play / pause
                         if (key == 'enter')
                                   //document.querySelector('button.ytp-play-button.ytp-button').dispatchEvent(click)
                                   // click on actual video el to activate it
                                   document.querySelector('video.video-stream.html5-main-video').dispatchEvent(click)

                         
                         else if (key == 'down'){
                                   
                                   document.querySelector('button.ytp-mute-button.ytp-button').dispatchEvent(click)
                                   /*let e = $.Event('keypress')
                                        e.which = 102//70; // Character 'A'=65
                                        e.altKey=false
                                        e.bubbles=true
                                        e.cancelable=true
                                        e.char=undefined
                                        e.charCode=102
                                        e.ctrlKey=false
                                        e.isTrigger = false
                                        e.key = "f"
                                        e.keyCode=102
                                        e.metaKey=false
                                        e.shiftKey=false
                                        e.view = window

                                        e.originalEvent = new KeyboardEvent({isTrusted: true, key:'f', })
                                        console.log('e to trigger',e)
                                        //$('video.video-stream.html5-main-video').trigger(e)
                                        $('body').trigger(e)*/
                                   //fireKey($('document'), 40)
                         
                         } else if (key == 'up') {
               
                         // subtitles
                         } else if (key == 'left') document.querySelector('button.ytp-subtitles-button.ytp-button').dispatchEvent(click)

                         // size change //fullscreen
                         else if (key == 'right') document.querySelector('button.ytp-size-button.ytp-button').dispatchEvent(click)
                                             //  document.querySelector('.ytp-fullscreen-button.ytp-button').dispatchEvent(click)
               


               } else if (window.location.host.includes('soundcloud.com')){
                         console.log('its soundcloud')

                         // play / pause
                         if (key == 'enter'){
                              document.querySelector('.playControl.sc-ir.playControls__control.playControls__play').dispatchEvent(click)

                         // tracklist toggle
                         } else if (key == 'down'){
                              document.querySelector('.playbackSoundBadge__queueCircle').dispatchEvent(click)
                         // like
                         } else if (key == 'up') {
                              document.querySelector('.sc-button-like.playbackSoundBadge__like.sc-button.sc-button-small.sc-button-icon.sc-button-responsive').dispatchEvent(click)
                         // previous
                         } else if (key == 'left') {
                              document.querySelector('.skipControl.sc-ir.playControls__control.playControls__prev.skipControl__previous').dispatchEvent(click)
                         // next
                         } else if (key == 'right'){
                              document.querySelector('.skipControl.sc-ir.playControls__control.playControls__next.skipControl__next').dispatchEvent(click)
                         }

               }

               // for games?
               // codes: https://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes
               //  left: 37, right: 39, up: 38, down: 40

               /**
                    $('item').keydown();
                    $('item').keypress();
                */

          }
          
          //$('#testBut').simulate('keypress')
     });


     $('body').keypress(function(e) {
          console.log('body says - e.which', String.fromCharCode( e.which), e )
          //simulateKeyPress("s")

          //window.dispatchEvent(new KeyboardEvent('keydown',{'key':'s'}));
          //document.dispatchEvent(new KeyboardEvent('keydown',{'key':'s'}));
          
     });
     window.onkeypress(ev=>{
          console.log('window keypress', ev)
     })
     /*$('document').on('keypress' , function(e) {
          console.log('test test')
     })*/

     //   simulateKeyPress("e");
})


function fireKey(el, key){
    //Set key to corresponding code. This one is set to the left arrow key.
    //key = 40
    if (document.createEventObject){
        var eventObj = document.createEventObject()
        eventObj.keyCode = key
        el.fireEvent("onkeydown", eventObj)

    } else if(document.createEvent){
        console.log('2nd option')
        var eventObj = document.createEvent("Events")
        //eventObj.initEvent("keydown", true, true)
        eventObj.initEvent("keypress", true, true)
        eventObj.which = key
        eventObj.keyCode = key
        el.dispatchEvent(eventObj)
    }
}



function simulateKeyPress(character) {
     console.log('character', character, 'code', character.charCodeAt(0))

     jQuery.event.trigger({ type : 'keypress', which : character.charCodeAt(0) });
}




