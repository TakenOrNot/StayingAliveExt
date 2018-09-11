//"use strict";
 
!function() {
 
    let capturer = null;
    let options = {
        /* Recording options */
        format: 'webm',
        framerate: '30FPS',
        start: function(){ startRecording(); },
        stop: function(){ stopRecording(); }
      };
 
 
      function initRecording(){
        capturer = new CCapture( {
          verbose: true,
          display: false,
          framerate: parseInt(options.framerate),
          motionBlurFrames: 0,
          quality: 100,
          format: options.format,
          workersPath: 'dist/src/',
          timeLimit: 0,
          frameLimit: 0,
          autoSaveTime: 0,
        } );
      }
      function startRecording(){
        update();
        initRecording();
        capturer.start();
      }
      function stopRecording(){
        cancelAnimationFrame(update);
        capturer.stop();
        capturer.save();
      }
 
 
      SWAM.video = {
          startRecording: startRecording,
          stopRecording: startRecording
      };
 
      function update(){
        /* Loop this function */
        requestAnimationFrame(update);
        if( capturer ) capturer.capture( Graphics.renderer.view );
      }
      update();
 
 
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