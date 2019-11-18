const Gpio = require('onoff').Gpio;

module.exports = class WaterLevelSensor {
    constructor(gpioNumber, thingSpeakField) {
        this.sensor = new Gpio(gpioNumber, 'in');
        this.thingSpeakField = thingSpeakField;
    }

    getState() {
        this.sensor.watch((err, value) => {
            return value;
        });
    }

    getThingSpeakField() {
        return this.thingSpeakField
    }
};