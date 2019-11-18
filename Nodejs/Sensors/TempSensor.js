module.exports = class TempSensor {
    constructor(sensorId, roundingDigits, thingSpeakField) {
        this.sensor = require('ds18b20-raspi');
        this.sensorId = sensorId;
        this.roundingDigits = roundingDigits;
        this.thingSpeakField = thingSpeakField;
    }

    getTemp() {
        return this.sensor.readC(this.sensorId, this.roundingDigits);
    }

    getThingSpeakField() {
        return this.thingSpeakField;
    }
};