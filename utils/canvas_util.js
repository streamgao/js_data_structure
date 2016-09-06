    var resizeCanvas = function() {
        // Create a new canvas
        var newCanvas = document.createElement('canvas');
        newCanvas.width = canvasWidth;
        newCanvas.height = canvasHeight;
        var newCtx = newCanvas.getContext('2d');

        // Copy our canvas to new canvas
        newCtx.drawImage(canvas, 0, 0, canvasWidth, canvasHeight);

        // Resize current canvas
        canvasWidth = canvas.width = window.innerWidth;
        canvasHeight = canvas.height = window.innerHeight;

        // Draw new canvas to current canvas
        ctx.drawImage(newCanvas, 0, 0, newCanvas.width, newCanvas.height);
    };

    //  window.addEventListener('resize', function(){
    //     clearTimeout(resizing);
    //     resizing = setTimeout(function(){
    //         resizeCanvas();
    //     }, 500);
    // });