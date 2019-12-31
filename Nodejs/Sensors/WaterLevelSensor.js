const Gpio = require('onoff').Gpio;

module.exports = class WaterLevelSensor {
    constructor(gpioNumber, thingSpeakField) {
        this.gpioNumber = gpioNumber;
        this.sensor = new Gpio(gpioNumber, 'in');
        this.thingSpeakField = thingSpeakField;
    }

    getState() {
        var value = this.sensor.readSync();
        console.log('Got water level value of pin ' + this.gpioNumber + '. Value is ' + value);
            return value;
    }

    getThingSpeakField() {
        return this.thingSpeakField
    }
};