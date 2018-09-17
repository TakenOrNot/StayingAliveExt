// ------------------------------------------------------------------------
//   Stay Alive for StarMash
// ------------------------------------------------------------------------
!function () {
    
    
    /* VARIABLES */

    let settings = {
        scales: '3500, 4500, 6000'
    },
    scaleIndex = -1;
    
    /* INIT */
    function init () {
        console.log('init SF');
        initEvents ();
        
    }

    function initEvents () {
        SWAM.on ( 'keydown', onKeydown );
        SWAM.on ( 'CTF_MatchStarted', onMatchStarted );
    }
    
    function initSettings () {

        const provider = new SettingsProvider ( settings, updated => settings = updated ),
        section = provider.addSection ( 'General' );

        section.addString ( 'scales', 'Scaling Factor' );

        return provider;

    }
    
    SWAM.on ( 'gameLoaded', init );
    
    /* GUI */
    
    $('body').append ("<div id='sfcontainer' style='display: none;'><div id='sf' style='display: block; position: absolute;left: 50%;margin: 0px 0px 0px -20px;bottom: 0px;width: 30px;height: 10px;padding: 5px;background: rgba(0, 247, 0, 0.5);border-radius: 5px 5px 0 0;text-align: center;color: #EEE;font-size: 10px;cursor: pointer;'>SF</div></div>");

    $("#sf").click(function (){
        console.log("SF clicked");
        
        //if (config.scalingFactor === 10000) {
        //    config.scalingFactor = osf;
        //    SWAM.ZoomTo(osf);
                
        //} else {
        //    config.scalingFactor = 10000;
        //    SWAM.ZoomTo(10000);
        //}
        

        
        
        $('#selectaircraft-1').click(function (){
            config.scalingFactor = osf;
            SWAM.ZoomTo(osf);
            $("#sfcontainer").css({display: "none"});

        }); 
        $('#selectaircraft-2').click(function (){
            config.scalingFactor = osf;
            SWAM.ZoomTo(osf);
            $("#sfcontainer").css({display: "none"});

        });     
        $('#selectaircraft-3').click(function (){
            config.scalingFactor = osf;
            SWAM.ZoomTo(osf);
            $("#sfcontainer").css({display: "none"});

        });
        $('#selectaircraft-4').click(function (){
            config.scalingFactor = osf;
            SWAM.ZoomTo(osf);
            $("#sfcontainer").css({display: "none"});

        });
        $('#selectaircraft-5').click(function (){
            config.scalingFactor = osf;
            SWAM.ZoomTo(osf);
            $("#sfcontainer").css({display: "none"});

        }); 

        
        cycleScale();
        
    });
    
    SWAM.on("playerRespawned", function(data){
            respawnedid = data['id'];
            if (respawnedid == Players.getMe().id){
                console.log("player respawned, hide Sf");
                $("#sfcontainer").css({display: "none"});
                config.scalingFactor = osf;
            }
    });
    
    SWAM.on ( 'gamePrep', function (){
        window.osf = config.scalingFactor;
        console.log("gameprep osf =" + osf);
        $("#sfcontainer").css({display: "none"});
    });
    
    
    
    function onKeydown ( event ) {
        
        if ( event.originalEvent.key === 'v' ) { 

            event.stopImmediatePropagation ();
   
            checkspecdelay = 2000;
            checkspec(checkspecdelay)
               
            
        }
         if ( event.originalEvent.key === 'u' ) { 

            event.stopImmediatePropagation ();
  
             console.log("u key pressed");
            // if (config.scalingFactor === 10000) {
            //     config.scalingFactor = osf;
            //     SWAM.ZoomTo(osf);
                
            // } else {
            //     config.scalingFactor = 10000;
            //     SWAM.ZoomTo(10000);
            // }
            
            
            cycleScale(); 
               
            
        }
        
    }
    
    function onMatchStarted () {
        checkspecdelay = 10000;
        checkspec(checkspecdelay)
    }
    
    function checkspec(checkspecdelay){
        window.setTimeout(function () {
                    if( $('#btnFreeSpectator').css('display') == 'block' ) {
                        console.log("v key pressed, show sf");
                        $("#sfcontainer").css({display: "block"});
                        
                    }
                },checkspecdelay); 
    }

    /* API */

    function _getScales () {

        return settings.sizes.split ( ',' ).map ( size => size.trim () );

    }

    function cycleScale ( index ) {

        const scales = _getScales ();

        scaleIndex = index === undefined ? ( scaleIndex + 1 ) % scale.length : index;

        const scale = scales[scaleIndex];

        config.scalingFactor = scale;
        SWAM.ZoomTo(scale);


    } 
    /* REGISTER */

    SWAM.registerExtension ({
        name: 'SF',
        id: 'SF',
        description: '',
        version: '1.0.0',
        author: 'xplay'
    });
    
}();