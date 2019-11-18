const Gpio = require('onoff').Gpio;

module.exports = class Relay {
    constructor(gpioNumber, thingSpeakField) {
        this.relay = new Gpio(gpioNumber, 'out');
        this.state = 0;
        this.thingSpeakField = thingSpeakField;
    }

    setStateActive() {
        this.state = 1;
        this.relay.writeSync(this.state);
    }

    setStateInactive() {
        this.state = 0;
        this.relay.writeSync(this.state);
    }

    getState() {
        return this.state;
    }

    getThingSpeakField() {
        return this.thingSpeakField
    }
}