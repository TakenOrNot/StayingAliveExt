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
        // TODO on CTF match started, wait 10 sec and check if we are in spec, if so AND stayalive = true, launch the countdown
    }
    
    SWAM.on ( 'gameLoaded', init );
    
    window.stayalive = false;
    // cdtime = 60000*9;
    cdtime = 30000;
    
    /* GUI */
    
    $('body').append ("<div id='stayalivecontainer' style='display: none;'><div id='countdown'></div><div id='stayalive' style='display: block; position: absolute;left: 50%;margin: 0px 0px 0px -75px;bottom: 175px;width: 150px;height: 25px;padding: 5px;background: rgba(0, 247, 0, 0.5);border-radius: 5px;text-align: center;color: #EEE;font-size: 15px;cursor: pointer;' value='false'>Piss Off Jz !</div></div>");

    $("#stayalive").click(function (){
        console.log("Stay Alive clicked");
        console.log(stayalive);
        // if (stayalive === ''){
        if (stayalive == false) {
            stayalive = true;
            stayalivefn();
            $("#stayalive").html('Stop Pissing Off Jz');
        }
        else {
            stayalive = false;
            $("#stayalive").html('Piss Off Jz');
        }
        
    $('#selectaircraft-1').click(function (){
        stayalive = false;
        $("#stayalivecontainer").css({display: "none"});
        $("#stayalive").html('Piss Off Jz');
    }); 
    $('#selectaircraft-2').click(function (){
        stayalive = false;
        $("#stayalivecontainer").css({display: "none"});
        $("#stayalive").html('Piss Off Jz');
    });     
    $('#selectaircraft-3').click(function (){
        stayalive = false;
        $("#stayalivecontainer").css({display: "none"});
        $("#stayalive").html('Piss Off Jz');
    });
    $('#selectaircraft-4').click(function (){
        stayalive = false;
        $("#stayalivecontainer").css({display: "none"});
        $("#stayalive").html('Piss Off Jz');
    });
    $('#selectaircraft-5').click(function (){
        stayalive = false;
        $("#stayalivecontainer").css({display: "none"});
        $("#stayalive").html('Piss Off Jz');
    }); 
            
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
    
    function stayalivefn (){
        if (stayalive == true) {
            console.log("Stay Alive enabled");
            
            //stayalive = 1;
            //function stayalive (){
                console.log("start respawn countdown " + cdtime);
                // window.setTimeout(function () {
                     // if( $('#btnFreeSpectator').css('display') == 'block' ) {
                var cd = setTimeout(function() {
                    
                    console.log("respawn countdown over");
                    if (stayalive == true){
                        console.log("RESPAWN");
                        
                        UI.selectAircraft(1)
                        
                        window.setTimeout(function () {
                            console.log("back to spectate");
                            // var specid = $( "#scoreboard .line" ).attr('player-id');
                            // console.log("spectate force");
                            // Network.sendCommand("spectate", "'" + specid + "'" + "");
                            // Network.sendCommand("spectate", specid + "");
                            // TODO try to force spectate until it works, in case we got killed when respawned
                            var forcespecinterval = setInterval(forcespec, 2000);
                            function forcespec() {
                                
                                if( $('#btnFreeSpectator').css('display') == 'block' ) {
                                        
                                        clearInterval(forcespecinterval);
                                }
                                else {
                                    console.log("try force spec");
                                    Network.spectateForce();
                                    stayalivefn();
                                    console.log("show stay alive GUI");
                                    $("#stayalivecontainer").css({display: "block"});
                                }
                            }
                                
                            
                            
                            
                        },2000);
                    }
                }, cdtime);
        }
    }
    
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
    
    UI.killedBy = function(On) {
            var Ln = null == On.level ? "" : "<span class=\"level\">" + On.level + "</span>";
            mn = {
                type: "destroyed",
                duration: 3e3,
                msg: "GULAG<span class=\"playerbig\"><span class=\"flag big flag-" + On.flag + "\"></span>" + UI.escapeHTML(On.name) + Ln + "</span>"
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