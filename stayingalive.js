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

        const html = `<div id='countdown'><div class='values'></div></div><script src="lib/easytimer/dist/easytimer.js"></script>`;
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
                    var timer = new Timer();
                    timer.start({countdown: true, startValues: {seconds: 540}});
                    $('#countdown .values').html(timer.getTimeValues().toString());
                    timer.addEventListener('secondsUpdated', function (e) {
                        $('#countdown .values').html(timer.getTimeValues().toString());
                    });
                    timer.addEventListener('targetAchieved', function (e) {
                        $('#countdown .values').html('KABOOM!!');
                    });
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