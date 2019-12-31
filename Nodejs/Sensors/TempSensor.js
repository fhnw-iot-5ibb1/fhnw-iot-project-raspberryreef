module.exports = class TempSensor {
    constructor(sensorId, roundingDigits, thingSpeakField) {
        this.sensor = require('ds18b20-raspi');
        this.sensorId = sensorId;
        this.roundingDigits = roundingDigits;
        this.thingSpeakField = thingSpeakField;
    }

    getTemp() {
        var value = this.sensor.readC(this.sensorId, this.roundingDigits);
        console.log('Got temp value of sensor ' + this.sensorId + '. Value is ' + value);
        return value;
    }

    getThingSpeakField() {
        return this.thingSpeakField;
    }
};