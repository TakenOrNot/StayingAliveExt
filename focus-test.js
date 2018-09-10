// ------------------------------------------------------------------------
//   Stay Alive for StarMash
// ------------------------------------------------------------------------
!function () {
    /* INIT */
    function init () {
        console.log('init Focus');
        initStyle ();
        window.focusmode = false;
    }

    function initEvents () {
        SWAM.on ( 'keydown', onKeydown );

    }
    
    SWAM.on ( 'gameLoaded', init );
    
    
    function initStyle () {

        const focusStyle = `
                    <style id='optionnalFbStyle'>
                        .focusmode > #logosmall {opacity:0;}
                        .focusmode > #scorebig {opacity:0;}
                        .focusmode > #roomnamecontainer {opacity:0;}
                        .focusmode > #scoreboard {opacity:0;}
                        .focusmode > #sidebar {opacity:0;}
                        .focusmode > #menu {opacity:0;}
                        .focusmode > #chatbox {opacity:0;}

                    </style>
                `
        $('head').append ( focusStyle );
    }
    
    /* GUI */
    
    $('body').append ("<div id='focuscontainer' style='display: none;'><div id='focus' style='display: block; position: absolute;left: 50%;margin: 0px 0px 0px 125px;bottom: 4px;width: 150px;height: 25px;padding: 5px;background: rgba(0, 247, 0, 0.5);border-radius: 5px;text-align: center;color: #EEE;font-size: 15px;cursor: pointer;'>Focus Mode</div></div>");

    $("#focus").click(function (){
        if (focusmode == false) {
            focusmode = true;
            $('body').addClass('focusmode');
            $("#focus").html('Stop Focus Mode');
        }
        else {
            focusmode = false;
            $('body').removeClass('focusmode');
            $("#focus").html('Focus Mode');
        }
    });
    

        
        
        $('#selectaircraft-1').click(function (){

            $("#focuscontainer").css({display: "none"});

        }); 
        $('#selectaircraft-2').click(function (){

            $("#focuscontainer").css({display: "none"});

        });     
        $('#selectaircraft-3').click(function (){

            $("#focuscontainer").css({display: "none"});

        });
        $('#selectaircraft-4').click(function (){

            $("#focuscontainer").css({display: "none"});

        });
        $('#selectaircraft-5').click(function (){

            $("#focuscontainer").css({display: "none"});

        }); 

        
    
    SWAM.on("playerRespawned", function(data){
            respawnedid = data['id'];
            if (respawnedid == Players.getMe().id){
 
                $("#focuscontainer").css({display: "none"});
  
            }
    });
    
    SWAM.on ( 'gamePrep', function (){

        $("#focuscontainer").css({display: "none"});
    });
    
    
    
    function onKeydown ( event ) {
        
        if ( event.originalEvent.key === 'v' ) { //note: This is not reliable to know if player is actually spectating

            event.stopImmediatePropagation ();
            
            // game.spectatingID is not reliable, as it is null at first when spectating, until we spectate another player      
            checkspecdelay = 2000;
            checkspec(checkspecdelay)
               
            
        }

        
    }
    
    function onMatchStarted () {
        checkspecdelay = 10000;
        checkspec(checkspecdelay)
    }
    
    function checkspec(checkspecdelay){
        window.setTimeout(function () {
                    if( $('#btnFreeSpectator').css('display') == 'block' ) {
                        console.log("v key pressed, show focus");
                        $("#focuscontainer").css({display: "block"});
                        
                    }
                },checkspecdelay); 
    }

    /* REGISTER */

    SWAM.registerExtension ({
        name: 'Focus',
        id: 'Focus',
        description: '',
        version: '1.0.0',
        author: 'xplay'
    });
    
}();