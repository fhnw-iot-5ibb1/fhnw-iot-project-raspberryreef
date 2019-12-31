const Gpio = require('onoff').Gpio;

module.exports = class Relay {
    constructor(gpioNumber, thingSpeakField) {
        this.gpioNumber = gpioNumber;
        this.relay = new Gpio(gpioNumber, 'out');
        this.state = 0;
        this.thingSpeakField = thingSpeakField;
    }

    setStateActive() {
        this.state = 1;
        console.log('Activated relay at gpio pin ' + this.gpioNumber + '. Value is ' + value);
        this.relay.writeSync(this.state);
    }

    setStateInactive() {
        this.state = 0;
        console.log('Deactivated relay at gpio pin ' + this.gpioNumber + '. Value is ' + value);
        this.relay.writeSync(this.state);
    }

    getState() {
        return this.state;
    }

    getThingSpeakField() {
        return this.thingSpeakField
    }
}