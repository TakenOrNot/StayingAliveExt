// ------------------------------------------------------------------------
//   Stay Alive for StarMash
// ------------------------------------------------------------------------
!function () {
    /* INIT */
    function init () {
        console.log('init Staying Alive');
        initEvents ();
        
    }

    function initEvents () {
        SWAM.on ( 'keydown', onKeydown );
        // TODO on CTF match started, wait 10 sec and check if we are in spec, if so lauch idletime, and if stayalive = true, launch also the countdown
        SWAM.on ( 'CTF_MatchStarted', onMatchStarted );
    }
    
    SWAM.on ( 'gameLoaded', init );
    
    window.stayalive = false;
    // cdtime = 60000*9;
    cdtotaltime = 60000*8;
    window.idletimeelapsed = 0;
    //window.idletimecounterinterval = setInterval(idletimecounter, 1000);
    
    /* GUI */
    
    $('body').append ("<div id='stayalivecontainer' style='display: none;'><div id='countdown' style='height: 100px;text-align: center; font-size: 2em; position: absolute; left: 50%; top: 40%; width: 400px; color: #FFF; margin: 0 0 0 -200px;'></div><div id='stayalive' style='display: block; position: absolute;left: 50%;margin: 0px 0px 0px -75px;bottom: 225px;width: 150px;height: 25px;padding: 5px;background: rgba(0, 247, 0, 0.5);border-radius: 5px;text-align: center;color: #EEE;font-size: 15px;cursor: pointer;'>Piss Off Jz !</div></div>");

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
        clearInterval(idletimecounterinterval);
        $("#stayalivecontainer").css({display: "none"});
        $("#stayalive").html('Piss Off Jz');
    }); 
    $('#selectaircraft-2').click(function (){
        stayalive = false;
        clearInterval(idletimecounterinterval);
        $("#stayalivecontainer").css({display: "none"});
        $("#stayalive").html('Piss Off Jz');
    });     
    $('#selectaircraft-3').click(function (){
        stayalive = false;
        clearInterval(idletimecounterinterval);
        $("#stayalivecontainer").css({display: "none"});
        $("#stayalive").html('Piss Off Jz');
    });
    $('#selectaircraft-4').click(function (){
        stayalive = false;
        clearInterval(idletimecounterinterval);
        $("#stayalivecontainer").css({display: "none"});
        $("#stayalive").html('Piss Off Jz');
    });
    $('#selectaircraft-5').click(function (){
        stayalive = false;
        clearInterval(idletimecounterinterval);
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
        
    });
    
    SWAM.on("playerRespawned", function(data){
            respawnedid = data['id'];
            if (respawnedid == Players.getMe().id){
                console.log("player respawned, hide Stay Alive GUI");
                $("#stayalivecontainer").css({display: "none"});
                clearInterval(idletimecounterinterval);
            }
    });
    
    SWAM.on ( 'gamePrep', function (){
        console.log("game prep");
        stayalive = false;
        $("#stayalivecontainer").css({display: "none"});
        clearInterval(idletimecounterinterval);
    });
    
    function stayalivefn (){
        if (stayalive == true) {
            idletimeelapsedms = (idletimeelapsed * 1000);
            console.log("Stay Alive enabled " + cdtotaltime + "-" + idletimeelapsedms + "=" + (cdtotaltime - idletimeelapsedms));
            
            cdtime = (cdtotaltime - idletimeelapsedms);
            //stayalive = 1;
            //function stayalive (){
                console.log("start respawn countdown " + cdtime);
                // window.setTimeout(function () {
                     // if( $('#btnFreeSpectator').css('display') == 'block' ) {
                var cd = setTimeout(function() {
                    
                    console.log("respawn countdown over");
                    if (stayalive == true){
                        console.log("AUTO RESPAWN IN 10sec");
                        //$("#countdown").css({display: "block"});
                        $("#countdown").html('Respawning in 10 seconds');
                        window.setTimeout(function () {
                            window.idletimeelapsed = 0;
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
                                        $("#countdown").css({display: "none"});
                                    }
                                }




                            },2000);
                        },10000);    
                    }
                }, cdtime);
        }
    }
    
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
                        console.log("v key pressed, show stay alive GUI");
                        $("#stayalivecontainer").css({display: "block"});
                        window.idletimeelapsed = 0;
                        // start counting idle time
                        if (!idletimecounterinterval){
                            var idletimecounterinterval = setInterval(idletimecounter, 1000);
                            // var idletimeelapsed = 0;
                            function idletimecounter() {

                                window.idletimeelapsed++
                                $("#countdown").html(window.idletimeelapsed);
                            }
                        }
                    }
                },checkspecdelay); 
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