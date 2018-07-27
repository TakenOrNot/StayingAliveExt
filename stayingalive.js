// ------------------------------------------------------------------------
//   Flag Chaser for StarMash
// ------------------------------------------------------------------------
!function () {
    /* INIT */
    function init () {
        console.log('init Staying Alive');
        // if this is not CTF, dont do anything more
        initEvents ();
        initHTML ();
    }

    function initEvents () {
        SWAM.on ( 'keydown', onKeydown );
    }
    
    function initHTML () {
        // <script src="https://takenornot.github.io/StayingAliveExt/lib/easytimer.js">
        const html = `<div id='countdown'></div>`;
        $('body').append ( html );

    }
    
    SWAM.on ( 'gameLoaded', init );
    
    
    function onKeydown ( event ) {
        
        if ( event.originalEvent.key === 'v' ) { //note: This is not reliable to know if player is actually spectating

            event.stopImmediatePropagation ();
            
            
            // game.spectatingID is not reliable, as it is null at first when spectating, until we spectate another player
            window.setTimeout(function () {
                 if( $('#btnFreeSpectator').css('display') == 'block' ) {
                    console.log("v key pressed, start respawn countdown"); 
                    // Get todays date and time
                    var nowspec = new Date().getTime();
                    // Set the date we're counting down to
                    var countDownDate = nowspec.setSeconds( nowspec.getSeconds() + 540 );



                    // Update the count down every 1 second
                    var x = setInterval(function() {

                      // Get todays date and time
                      var now = new Date().getTime();

                      // Find the distance between now an the count down date
                      var distance = countDownDate - now;

                      // Time calculations for days, hours, minutes and seconds
                      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
                      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

                      // Display the result in the element with id="demo"
                      document.getElementById("countdown").innerHTML = minutes + "m " + seconds + "s ";

                      // If the count down is finished, write some text
                      if (distance < 0) {
                        clearInterval(x);
                        document.getElementById("countdown").innerHTML = "EXPIRED";
                      }
                    }, 1000);
                };       
                        
            },2000);
            
          
        }
        
        

    }
    
    

    /* REGISTER */

    SWAM.registerExtension ({
        name: 'Staying Alive',
        id: 'StayingAlive',
        description: '',
        version: '1.0.0',
        author: 'xplay'
    });
    
}();