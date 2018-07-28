// ------------------------------------------------------------------------
//   Stay Alive for StarMash
// ------------------------------------------------------------------------
!function () {
    /* INIT */
    function init () {
        console.log('init Staying Alive');
        // if this is not CTF, dont do anything more
        initEvents ();
        
    }

    function initEvents () {
        SWAM.on ( 'keydown', onKeydown );
        
    }
    
    SWAM.on ( 'gameLoaded', init );
    
    window.stayalive = false;
    cdtime = 30000;
    
    /* GUI */
    
    $('body').append ("<div id='stayalivecontainer' style='display: none;'><div id='countdown'></div><div id='stayalive' style='display: block; position: absolute;left: 50%;margin: -75px;bottom: 400px;width: 150px;height: 25px;padding: 5px;background: rgba(0, 247, 0, 0.5);border-radius: 5px;text-align: center;color: #EEE;font-size: 15px;cursor: pointer;' value='false'>Piss Off Jz !</div></div>");

    $("#stayalive").click(function stayalivefn (){
        console.log("Stay Alive clicked");
        console.log(stayalive);
        // if (stayalive === ''){
        if (stayalive == false) {
            stayalive = true;
            console.log("Stay Alive enabled");
            //stayalive = 1;
            //function stayalive (){
                console.log("start respawn countdown");
                // window.setTimeout(function () {
                     // if( $('#btnFreeSpectator').css('display') == 'block' ) {
                var cd = setTimeout(function() {
                    
                    console.log("respawn countdown over");
                    if (stayalive == true){
                        console.log("RESPAWN");
                        $('#selectaircraft-1').click(); 
                        window.setTimeout(function () {
                            console.log("back to spectate");
                            // var specid = $( "#scoreboard .line" ).attr('player-id');
                            // console.log("spectate force");
                            // Network.sendCommand("spectate", "'" + specid + "'" + "");
                            // Network.sendCommand("spectate", specid + "");
                            Network.spectateForce();
                            stayalivefn();
                            console.log("show stay alive GUI");
                            $("#stayalivecontainer").css({display: "block"});
                            
                        },4000);
                    }
                }, cdtime);
        }
        else {
            stayalive = false;
            
        }
            
                    // };       

                // },2000);
            
            //}
            //stayalive ();    
        // }
        // else {
        //    console.log("Stay Alive disabled");
        //    stayalive = '';
        //}
        
        SWAM.on("playerRespawned", function(data){
            respawnedid = data['id'];
            if (respawnedid == Players.getMe().id){
                console.log("player respawned, hide Stay Alive GUI");
                $("#stayalivecontainer").css({display: "none"});
            }
        });
        
    });
    
    function onKeydown ( event ) {
        
        if ( event.originalEvent.key === 'v' ) { //note: This is not reliable to know if player is actually spectating

            event.stopImmediatePropagation ();
            
            // game.spectatingID is not reliable, as it is null at first when spectating, until we spectate another player      
            
             
            window.setTimeout(function () {
                if( $('#btnFreeSpectator').css('display') == 'block' ) {
                    console.log("v key pressed, show stay alive GUI");
                    $("#stayalivecontainer").css({display: "block"});
                }
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