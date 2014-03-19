$(document).ready(function() {

    BO.enableDebugging = true;

    var host = "localhost";
    var arduino = new BO.IOBoard(host, 8887);

    var POT_DELTA_THRESHOLD = 0.01,
        potX,
        potY,
        btn,
        valX = null,
        valY = null,
        drawX,
        drawY,
        canvas,
        canvasContext;

    arduino.addEventListener(BO.IOBoardEvent.READY, onReady);

    function onReady(event) {
        arduino.removeEventListener(BO.IOBoardEvent.READY, onReady);
        init();
    }

    function init() {

        console.log('Hello?', 1);

        initCanvas();

        potX = new BO.io.Potentiometer(arduino, arduino.getAnalogPin(1));

        potX.addEventListener(BO.io.PotEvent.CHANGE, function(event) {

            var newValue = event.target.value;

            console.log('new x');

            if( valX === null ) {
                valX = newValue;
            }

            // Threshold so we ignore tiny changes caused by noise on the board
            if( newValue > valX && newValue - valX > POT_DELTA_THRESHOLD ||
                newValue < valX && valX - newValue > POT_DELTA_THRESHOLD ) {

                valX = newValue;

                console.log('valX', valX);

                //$('#debugX').text(valX);

                updateDrawing();

            }

        });

        potY = new BO.io.Potentiometer(arduino, arduino.getAnalogPin(0));

        potY.addEventListener(BO.io.PotEvent.CHANGE, function(event) {

            var newValue = event.target.value;

            console.log('new y');

            if( valY === null ) {
                valY = newValue;
            }

            // Threshold so we ignore tiny changes caused by noise on the board
            if( newValue > valY && newValue - valY > POT_DELTA_THRESHOLD ||
                newValue < valY && valY - newValue > POT_DELTA_THRESHOLD ) {

                valY = newValue;

                console.log('valY', valY);

                //$('#debugY').text(valY);

                updateDrawing();

            }

        });

        btn = new BO.io.Button(arduino, arduino.getDigitalPin(10), BO.io.Button.PULL_UP);

        btn.addEventListener(BO.io.ButtonEvent.PRESS, onPress);

    }

    function onPress() {

        console.log('on press');

        clearCanvas();

    }

    function initCanvas() {

        canvas = document.getElementById('canvas');
        canvasContext = canvas.getContext('2d');

        canvasContext.moveTo(400, 300);
        canvasContext.beginPath();

    }

    function clearCanvas() {

        canvasContext.clearRect ( 0 , 0 , 800 , 600 );

        canvasContext.moveTo(400, 300);
        canvasContext.beginPath();

    }

    function updateDrawing() {

        drawX = 800 * valX;
        drawY = 600 * valY;

        canvasContext.lineTo(drawX, drawY);
        canvasContext.stroke();

    }


});