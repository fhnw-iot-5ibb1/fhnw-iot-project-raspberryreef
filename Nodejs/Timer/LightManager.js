module.exports = class LightManager {
    constructor(sunrise, afternoonPauseStart, afternoonPauseEnd, sunset) {
        this.sunrise = sunrise;
        this.afternoonPauseStart = afternoonPauseStart;
        this.afternoonPauseEnd = afternoonPauseEnd;
        this.sunset = sunset;
    }

    getSunrise() {
        return calculateReturnTime(this.sunrise);
    }

    getAfternoonPauseStart() {
        return calculateReturnTime(this.afternoonPauseStart);
    }

    getAfternoonPauseEnd() {
        return calculateReturnTime(this.afternoonPauseEnd);
    }

    getSunset() {
        return this.calculateReturnTime(this.sunset);
    }

    getTotalOnTime() {
        var _MS_PER_HOUR = 1000 * 60 * 60;

        if (hasPause()) {
            return Math.floor((calculateReturnTime(this.sunrise) - calculateReturnTime(this.afternoonPauseStart)) / _MS_PER_HOUR) +
                Math.floor((calculateReturnTime(this.afternoonPauseEnd) - calculateReturnTime(this.sunset)) / _MS_PER_HOUR);
        } else {
            return Math.floor((calculateReturnTime(this.sunrise) - calculateReturnTime(this.sunset)) / _MS_PER_HOUR);
        }
    }

    getLightShouldBeOn() {
        var now = new Date();

        if (hasPaus()) {
            return now >= this.sunrise && now <= this.afternoonPauseStart || now >= this.afternoonPauseEnd && now <= this.sunset;
        } else {
            return now >= this.sunrise && now <= this.sunset;
        }
    }

    hasPause() {
        return this.afternoonPauseStart == null;
    }

    calculateReturnTime(date) {
        var now = new Date();
        return new Date(now.getFullYear(), now.getMonth(), now.getDate(), date.getHours(), date.getSeconds(), date.getMilliseconds())
    }
};