"use strict";

!function() {

    let capturer = null;
    let options = {
        /* Recording options */
        format: /*'webm', //*/'webm-mediarecorder',
        //framerate: '20FPS',
        start: function(){ startRecording(); },
        stop: function(){ stopRecording(); }
      };

    // maybe try to set frameLimit
      function initRecording(){
        capturer = new CCapture( {
          //verbose: true,
          display: false,
          //framerate: parseInt(options.framerate),
          motionBlurFrames: 0,
          quality: 50,
          format: options.format,
          workersPath: 'dist/src/',
          timeLimit: 0,
          //frameLimit: 0,
          autoSaveTime: 0,
        } );
      }
      function startRecording(){
        //update();
        initRecording();
        capturer.start();
        
      }
      function stopRecording(){
        //cancelAnimationFrame(update);
        capturer.stop();
        capturer.save();
        //clearInterval(updateinterval);  
      }
 

      SWAM.video = {
          startRecording: startRecording,
          stopRecording: stopRecording
      };
        
      function update(){
        //Loop this function
        //kapturerelay();   
        requestAnimationFrame(update);
        //var updateinterval = setInterval(update, 41);  
        //if( capturer ) capturer.capture( Graphics.renderer.view );
        
      }
      update();
    
       setTimeout(function(){
                if( capturer ) capturer.capture( Graphics.renderer.view );
            }, 41);
    
	// Register
	SWAM.registerExtension({
		name: 'Video Recorder for StarMash',
		id: 'SWAM.Video',
		description: 'Records video of the game.',
		author: 'Bombita',
		version: '0.1',
        //settingsProvider: createSettingsProvider(),
        dependencies: [
            "https://cdn.rawgit.com/spite/ccapture.js/0bb38d6f/build/CCapture.all.min.js"
        ]        
	});
}();