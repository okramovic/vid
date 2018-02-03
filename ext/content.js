console.info('CONTENT SCRIPT SAYS HI')
const port = chrome.runtime.connect({name: window.location.origin})

//var myevent = document.createEvent('Event');


//  https://learn.jquery.com/events/triggering-event-handlers/
let tabActive

$(function(){
     



     console.info('jquery SAYS HI', window.location.host)
     var click = document.createEvent("HTMLEvents");
     click.initEvent("click", true, true);

     
     port.onMessage.addListener( key =>{
          console.log('pressed', key)
          //simulateKeyPress(msg.key)

          chrome.runtime.sendMessage('shouldActivate', function(response) {
               //console.log('response', response);
          })
          chrome.runtime.onMessage.addListener((req, sender, sendResponse)=>{
                    
                    console.log('?', req, window.location.href, window.location.href === req)
                    tabActive = req === window.location.href

                    if (tabActive){

                         if  (window.location.host.includes('youtube.com')){

                              if (key == 'enter'){
                                   //console.log('ARROW UP   ytp but', document.querySelector('.ytp-play-button.ytp-button') )
                                   document.querySelector('button.ytp-play-button.ytp-button').dispatchEvent(click)
               
                              } else if (key == 'f')  // fullscreen
                                   //  document.querySelector('.ytp-fullscreen-button.ytp-button').dispatchEvent(click)
                                   document.querySelector('button.ytp-size-button.ytp-button').dispatchEvent(click)
                              else if (key == 'c') document.querySelector('.ytp-subtitles-button.ytp-button').dispatchEvent(click)
               
                              else if (key == 'm') document.querySelector('button.ytp-mute-button.ytp-button').dispatchEvent(click)
                              
               
                         } else if (window.location.host.includes('soundcloud.com')){
                              console.log('its soundcloud')
               
                              if (key == 'enter'){
                                   document.querySelector('.playControl.sc-ir.playControls__control.playControls__play').dispatchEvent(click)
                              }
                         }
                    }
          })
          //var e = jQuery.Event("keypress")
          //e.which = e.keyCode = msg.key//.charCodeAt(0)
          //$("body").trigger(e)

          // find out if its active tab!

          
               //$('#testBut').simulate('keypress')
     });


     $('body').keypress(function(e) {
          console.log('body says - e.which', String.fromCharCode( e.which), e )
          //simulateKeyPress("s")

          //window.dispatchEvent(new KeyboardEvent('keydown',{'key':'s'}));
          //document.dispatchEvent(new KeyboardEvent('keydown',{'key':'s'}));
          
     });

     /*$('document').on('keypress' , function(e) {
          console.log('test test')
     })*/

     //   simulateKeyPress("e");
})




function simulateKeyPress(character) {
     console.log('character', character, 'code', character.charCodeAt(0))

     jQuery.event.trigger({ type : 'keypress', which : character.charCodeAt(0) });
}




