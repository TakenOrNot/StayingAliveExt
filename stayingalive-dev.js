// ------------------------------------------------------------------------
//   Stay Alive for StarMash
// ------------------------------------------------------------------------
!function () {
    /* INIT */
function initStyle () {

        const style = `
          <style>
            #msg-destroyed {display:none;}
            #msg-destroyed-gulag {top: 50%; font-weight:800;width:80%;left:10%; font-size: 25px; padding: 0px 0px 0px 50px; vertical-align: middle;}
          </style>
        `;

        $('body').append ( style );

    }


$("body").append("<div id='#msg-destroyed-gulag'></div>");
    


SWAM.on("playerKilled", function (data, dead, killer){
                        if (dead.id === game.myID){
                            //$("#msg-destroyed-gulag").html('Sent to Gulag by ' + killer.id );
                            $("body").append("<div id='#msg-destroyed-gulag' style='top: 50%; font-weight:800;width:80%;left:10%; font-size: 25px; padding: 0px 0px 0px 50px; vertical-align: middle;height:100px; background:red'> Sent to Gulag by " +  killer.id + "</div>");
                            console.log('GULAG');
                        }
        });
        
    function init () {

        //initHTML ();
        initStyle ();
        //initEvents ();

    }

SWAM.on ( 'gameLoaded', init );

    /* REGISTER */

    SWAM.registerExtension ({
        name: 'Staying Alive dev',
        id: 'StayingAlive dev',
        description: '',
        version: '1.0.0',
        author: 'xplay'
    });
    
}();