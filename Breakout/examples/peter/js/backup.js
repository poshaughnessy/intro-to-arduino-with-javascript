$(document).ready(function() {

    BO.enableDebugging = true;

    var host = "localhost";
    var arduino = new BO.IOBoard(host, 8887);

    //Define your variables
    var //led,
        //btn,
        //isOn,
        pot1,
        pot2;

    arduino.addEventListener(BO.IOBoardEvent.READY, onReady);

    function onReady(event) {
        arduino.removeEventListener(BO.IOBoardEvent.READY, onReady);
        init();
    }

    function init() {

        /*
        //led = new BO.io.LED(arduino, arduino.getDigitalPin(6));
        //led.fadeIn();
        //isOn = false;

        setInterval(function() {
            if( isOn ) {
                //led.fadeOut();
                led.blink(100, 10);
                isOn = false;
            } else {
                led.fadeIn();
                isOn = true;
            }
        }, 1000);

        led = new BO.io.RGBLED(arduino, arduino.getDigitalPin(9),
            arduino.getDigitalPin(10), arduino.getDigitalPin(11));

        //led.setColor(220, 10, 123);
        //led.setColor(255, 0, 0);
        */

        console.log('Hello?', 1);

        /*
        btn = new BO.io.Button(arduino, arduino.getDigitalPin(10), BO.io.Button.PULL_UP);

        btn.addEventListener(BO.io.ButtonEvent.PRESS, onPress);
        */

        pot1 = new BO.io.Potentiometer(arduino, arduino.getAnalogPin(0));

        pot1.addEventListener(BO.io.PotEvent.CHANGE, function(event) {

            console.log('pot1', event.target.value);

        });

        pot2 = new BO.io.Potentiometer(arduino, arduino.getAnalogPin(1));

        pot2.addEventListener(BO.io.PotEvent.CHANGE, function(event) {

            console.log('pot2', event.target.value);

        });

    }

    /*
    function onPress(event) {
        console.log('Pressed!');

        if( isOn ) {
            led.fadeOut();
            isOn = false;
        } else {
            led.fadeIn();
            isOn = true;
        }

        btn.addEventListener(BO.io.ButtonEvent.RELEASE, onRelease);
    }

    function onRelease(event) {
        console.log('Released!');

        //led.fadeOut();

        btn.removeEventListener(BO.io.ButtonEvent.RELEASE, onRelease);
    }
    */


});