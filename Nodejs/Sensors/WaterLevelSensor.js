const Gpio = require('onoff').Gpio;

module.exports = class WaterLevelSensor {
    constructor(gpioNumber, thingSpeakField) {
        this.gpioNumber = gpioNumber;
        this.sensor = new Gpio(gpioNumber, 'in');
        this.thingSpeakField = thingSpeakField;
    }

    getState() {
        this.sensor.watch((err, value) => {
            console.log('Got water level value of pin ' + this.gpioNumber + '. Value is ' + value);
            return value;
        });
    }

    getThingSpeakField() {
        return this.thingSpeakField
    }
};