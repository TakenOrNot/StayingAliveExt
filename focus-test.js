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
                    <style id='focusmodeStyle'>
                        .focusmode > #logosmall {opacity:0;}
                        .focusmode > #scorebig {opacity:0;}
                        .focusmode > #roomnamecontainer {opacity:0;}
                        .focusmode > #scoreboard {opacity:0;}
                        .focusmode > #sidebar {opacity:0;}
                        .focusmode > #menu {opacity:0;}
                        .focusmode > #chatbox {opacity:0;}
                        .focusmode > #settings {opacity:0;}

                    </style>
                `
        $('head').append ( focusStyle );
    }
    
    /* GUI */
    
    $('body').append ("<div id='focuscontainer' style='display: block;'><div id='focus' style='display: block; position: absolute; right: 150px; margin: 0px 0px 0px 125px; top: 14px; width: 80px; height: 15px; padding: 5px; background: rgba(0, 0, 0, 0.5); border-radius: 5px; text-align: center; color: #EEE; font-size: 10px; cursor: pointer;'>Focus Mode</div></div>");

    $("#focus").click(function (){
        if (focusmode == false) {
            focusmode = true;
            //$('body').addClass('focusmode');
            $('#logosmall').toggle( "slide" );
            $('#scorebig').toggle( "slide" );
            $('#roomnamecontainer').fadeToggle( "fast");
            $('#scoreboard').toggle( "slide" );
            $('#sidebar').fadeToggle( "fast");
            $('#menu').fadeToggle( "fast");
            $('#chatbox').toggle( "slide" );
            $('#settings').fadeToggle( "fast");
            $("#focus").html('Stop Focus');
        }
        else {
            focusmode = false;
            //$('body').removeClass('focusmode');
            $('#logosmall').toggle( "slide" );
            $('#scorebig').toggle( "slide" );
            $('#roomnamecontainer').fadeToggle( "fast");
            $('#scoreboard').toggle( "slide" );
            $('#sidebar').fadeToggle( "fast");
            $('#menu').fadeToggle( "fast");
            $('#chatbox').toggle( "slide" );
            $('#settings').fadeToggle( "fast");
            $("#focus").html('Focus Mode');
        }
    });
    

  
    
    function onKeydown ( event ) {
        
        if ( event.originalEvent.key === 'v' ) { //note: This is not reliable to know if player is actually spectating

            event.stopImmediatePropagation ();
            
            // game.spectatingID is not reliable, as it is null at first when spectating, until we spectate another player      
            //checkspecdelay = 2000;
            //checkspec(checkspecdelay)
               
            
        }

        
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