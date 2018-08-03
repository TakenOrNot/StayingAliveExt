// ------------------------------------------------------------------------
//   Stay Alive for StarMash
// ------------------------------------------------------------------------
!function () {
    /* INIT */
    function init () {
        console.log('init SR');
        // initEvents ();
        
    }

    SWAM.on ( 'gameLoaded', init );
    
    
    
    
function smartrotate(targetangle){ 
    
    rot = Players.getMe().rot;
    
    onedeg = 360 / 6250000000000000;
    rotint = rot * 1000000000000000;
    rotdeg = onedeg * rotint;
    
    targetangleint = targetangle * 1000000000000000;
    targetangledeg = onedeg * targetangleint;
    
    
    console.log("rotdeg = " + rotdeg + " targetangledeg = " + targetangledeg);
    
    toturn = '';
    
    if (rotdeg > 180){
    
        if (targetangledeg > 180){ 
            
             if (targetangledeg > rotdeg){
                
                    toturn = 'RIGHT';
                
                
             }
             else {
                if (((360 - targetangledeg) + rotdeg) > (targetangledeg - rotdeg)){
                    toturn = 'RIGHT';
                }
                
                toturn = 'LEFT';
             
             }
             
        }
        
        if (targetangledeg < 180){ 
             console.log("targ < 180")   
             if ((rotdeg - targetangledeg) < ((360 - rotdeg) + targetangledeg)){
                console.log((rotdeg - targetangledeg) + " < " + ((360 - rotdeg) + targetangledeg))
                toturn = 'LEFT';
             }
             else {
             
                toturn = 'RIGHT';
                
             }
             
        }
        
    
    }
    else if (rotdeg < 180){
    
        if (targetangledeg > 180){ 
            
             
                    
                    if (((360 - targetangledeg) + rotdeg) < (targetangledeg - rotdeg)){
                    
                        toturn = 'LEFT';
                    }
                    else {
                    
                        toturn = 'RIGHT';
                    
                    }
                
             
             
        }
        
        if (targetangledeg < 180){ 
            
             toturn = 'LEFT';
                
         }
             
        }
    
    
    
    var precision = 1;
    
    console.log(Date.now() + " rot " + toturn + " " + targetangle )
    
    Network.sendKey(toturn,!0);
    
    function repeatMe(){ 
        rot = Players.getMe().rot;
        console.log(rot);
        if (toturn == 'RIGHT'){
            if((rot > targetangle) && (rot < (targetangle + precision))){
                
                clearInterval(rotcheck);
                Network.sendKey(toturn,!1);
                $(this).dequeue();
                console.log("stop rot =" + rot + " > targetangle = " + targetangle + " toturn = " + toturn)
            
        } else {
            if((rot < targetangle) && (rot > (targetangle + precision))){
                
                
                    clearInterval(rotcheck);
                    Network.sendKey(toturn,!1);
                    $(this).dequeue();
                    console.log("stop rot =" + rot + " < targetangle = " + targetangle + " toturn = " + toturn)
                
            }
        
        }
    }
    var rotcheck = setInterval(repeatMe, 10); 
}
    
}

    /* REGISTER */

    SWAM.registerExtension ({
        name: 'SR',
        id: 'SR',
        description: '',
        version: '1.0.0',
        author: 'xplay'
    });
    
}();