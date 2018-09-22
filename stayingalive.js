// ------------------------------------------------------------------------
//   Stay Alive for StarMash
// ------------------------------------------------------------------------
!function () {
    /* INIT */
    function init () {
        console.log('init Staying Alive');
        initEvents ();
        initStyle ();
        window.stayalive = false;
        window.idletimecounterbound = false;
        // cdtime = 60000*9;
        cdtotaltime = 60000*8;
        window.idletimeelapsed = 0;
    }

    function initEvents () {
        SWAM.on ( 'keydown', onKeydown );
        // on CTF match started, wait 10 sec and check if we are in spec, if so lauch idletime, and if stayalive = true, launch also the countdown
        SWAM.on ( 'CTF_MatchStarted', onMatchStarted );
    }
    
    SWAM.on ( 'gameLoaded', init );
    
    
    //window.idletimecounterinterval = setInterval(idletimecounter, 1000);
    
    /* GUI */
    
    $('body').append ("<div id='stayalivecontainer''><div id='stayalivebtn' style='display: block; position: absolute;left: 50%;margin: 0px 0px 0px -75px;bottom: 225px;width: 150px;height: 25px;padding: 5px;background: rgba(0, 247, 0, 0.5);border-radius: 5px;text-align: center;color: #EEE;font-size: 15px;cursor: pointer;'><div id='stayalive' style='display: inline;'>Piss Off Jz !</div><div id='countdown' style='display:inline;'></div></div><div id='countdownover' class='message' style='height: 100px;text-align: center; font-size: 2em; position: absolute; left: 50%; top: 40%; width: 400px; color: #FFF; margin: 0 0 0 -200px;'></div></div>");

    $("#stayalivebtn").click(function (){
        console.log("Stay Alive clicked");
        console.log(stayalive);
        // if (stayalive === ''){
        if (stayalive == false) {
            stayalive = true;
            // stayalivefn();
            $("#stayalive").html('Stop P.O. Jz');
        }
        else {
            stayalive = false;
            $("#stayalive").html('Piss Off Jz');
        }
        
    $('#selectaircraft-1').click(function (){
        stayalive = false;
        
        //$("#stayalivecontainer").css({display: "none"});
        $("#stayalive").html('Piss Off Jz');
    }); 
    $('#selectaircraft-2').click(function (){
        stayalive = false;
        
        //$("#stayalivecontainer").css({display: "none"});
        $("#stayalive").html('Piss Off Jz');
    });     
    $('#selectaircraft-3').click(function (){
        stayalive = false;
        
        //$("#stayalivecontainer").css({display: "none"});
        $("#stayalive").html('Piss Off Jz');
    });
    $('#selectaircraft-4').click(function (){
        stayalive = false;
        
        //$("#stayalivecontainer").css({display: "none"});
        $("#stayalive").html('Piss Off Jz');
    });
    $('#selectaircraft-5').click(function (){
        stayalive = false;
        
        //$("#stayalivecontainer").css({display: "none"});
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
                //console.log("player respawned, hide Stay Alive GUI");
                //$("#stayalivecontainer").css({display: "none"});
                
            }
    });
    
    SWAM.on ( 'gamePrep', function (){
        console.log("game prep");
        stayalive = false;
        //$("#stayalivecontainer").css({display: "none"});
        
    });
    
    function stayalivefn (){
        if (stayalive == true) {
             idletimeelapsedms = (idletimeelapsed * 1000);
            console.log("Stay Alive enabled " + cdtotaltime + "-" + idletimeelapsedms + "=" + (cdtotaltime - idletimeelapsedms));
            
            cdtime = (cdtotaltime - idletimeelapsedms);
            //stayalive = 1;
            //function stayalive (){
                //console.log("start respawn countdown " + cdtime);
                // window.setTimeout(function () {
                     // if( $('#btnFreeSpectator').css('display') == 'block' ) {
                //var cd = setTimeout(function() {
                    
                    console.log("respawn countdown over");
                    //if (stayalive == true){
                        console.log("AUTO RESPAWN IN 10sec");
                        //$("#countdown").css({display: "block"});
                        $("#countdownover").show();
                        $("#countdownover").html('Respawning in 10 seconds');
                        window.setTimeout(function () {
                            console.log("StayAlive RESPAWN");
                            window.idletimeelapsed = 0;
                            UI.selectAircraft(1)

                            //window.setTimeout(function () {

                                console.log("try to go back to spectate");
                                
                                // try to force spectate until it works, in case we got killed when respawned
                                var forcespectries = 0;
                                var forcespecinterval = setInterval(forcespec, 5000);
                                function forcespec() {
                                    // try maximum 5 times
                                    forcespectries = forcespectries + 1;
                                    if (forcespectries < 5){
                                        if( $('#btnFreeSpectator').css('display') == 'block' ) {

                                                clearInterval(forcespecinterval);
                                        }
                                        else {
                                            console.log("try force spec");
                                            Network.spectateForce();
                                            // stayalivefn();

                                            // $("#stayalivecontainer").css({display: "block"});
                                            // $("#countdown").css({display: "none"});
                                            checkspecdelay = 10000;
                                            checkspec(checkspecdelay)
                                        }
                                    }
                                    else {
                                        window.stayalive = false;
                                        clearInterval(forcespecinterval);
                                    }
                                }




                            //},2000);
                        },10000);    
                    //}
                //}, cdtime);
        }
    }
    
    function onKeydown ( event ) {
        
        if ( event.originalEvent.key === 'v' ) { //note: This is not reliable to know if player is actually spectating

            event.stopImmediatePropagation ();
            console.log("v key pressed");
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
                        console.log("show stay alive GUI");
                       // $("#stayalivecontainer").css({display: "block"});
                        $("#countdownover").hide();
                        window.idletimeelapsed = 0;
                        // start counting idle time
                        if (!idletimecounterbound){
                            var idletimecounterinterval = setInterval(idletimecounter, 1000);
                            // var idletimeelapsed = 0;
                            window.idletimecounterbound = true;
                            function idletimecounter() {
                                cdcalc = ((cdtotaltime/1000) - window.idletimeelapsed);
                                cddisplay = new Date(1000 * cdcalc).toISOString().substr(11, 8).replace('00:','');
                                $("#countdown").html(" (" + cddisplay + ")");
                                
                                if (cdcalc <= 0){
                                    if (stayalive == true) {
                                        stayalivefn();
                                        window.idletimeelapsed = 0;
                                    }
                                    else {
                                        
                                        $("#countdownover").show();
                                        $("#countdownover").html('Going to be AFK kicked soon !');
                                        
                                    }
                                }
                                else {
                                    window.idletimeelapsed++
                                }
                            }
                        }
                    }
                    else {
                        // not spectating 10 sec after match started / 2 sec after v pressed
                        window.stayalive = false;
                        
                    }
                },checkspecdelay); 
    }
    
    function initStyle () {

        const style = `
            <style id='stayaliveStyle'>
                #stayalivecontainer {display: none;}
                .spectatorMode > #stayalivecontainer {display: block;}
            </style>
        `
        
        $('body').append ( style );
        
    }
    
    /* REGISTER */

    SWAM.registerExtension ({
        name: 'Staying Alive',
        id: 'StayingAlive',
        description: 'Respawn automaticaly to avoid beeing kicked out',
        version: '1.0.0',
        author: 'xplay'
    });
    
}();