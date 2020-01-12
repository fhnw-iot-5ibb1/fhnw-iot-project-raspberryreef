module.exports = class LightManager {
    constructor(sunrise, afternoonPauseStart, afternoonPauseEnd, sunset) {
        this.sunrise = sunrise;
        this.afternoonPauseStart = afternoonPauseStart;
        this.afternoonPauseEnd = afternoonPauseEnd;
        this.sunset = sunset;
    }

    getSunrise() {
        return this.calculateReturnTime(this.sunrise);
    }

    getAfternoonPauseStart() {
        return this.calculateReturnTime(this.afternoonPauseStart);
    }

    getAfternoonPauseEnd() {
        return this.calculateReturnTime(this.afternoonPauseEnd);
    }

    getSunset() {
        return this.calculateReturnTime(this.sunset);
    }

    // returns the configured amount of hours the lights are on
    getTotalOnTime() {
        var _MS_PER_HOUR = 1000 * 60 * 60;

        if (this.hasPause()) {
            return Math.floor((this.calculateReturnTime(this.afternoonPauseStart) - this.calculateReturnTime(this.sunrise)) / _MS_PER_HOUR) +
                Math.floor((this.calculateReturnTime(this.sunset) - this.calculateReturnTime(this.afternoonPauseEnd)) / _MS_PER_HOUR);
        } else {
            return Math.floor((this.calculateReturnTime(this.sunset)- this.calculateReturnTime(this.sunrise)) / _MS_PER_HOUR);
        }
    }

    // calculates if the lights should be on at the moment
    getLightShouldBeOn() {
        var now = new Date();

        if (this.hasPause()) {
            return now >= this.calculateReturnTime(this.sunrise) && now <= this.calculateReturnTime(this.afternoonPauseStart) || now >= this.calculateReturnTime(this.afternoonPauseEnd) && now <= this.calculateReturnTime(this.sunset);
        } else {
            return now >= this.calculateReturnTime(this.sunrise) && now <= this.calculateReturnTime(this.sunset);
        }
    }

    hasPause() {
        return !this.afternoonPauseStart == null;
    }

    // calculates the time of the day
    calculateReturnTime(date) {
        var now = new Date();
        return new Date(now.getFullYear(), now.getMonth(), now.getDate(), date.getHours(), date.getSeconds(), date.getMilliseconds())
    }
};