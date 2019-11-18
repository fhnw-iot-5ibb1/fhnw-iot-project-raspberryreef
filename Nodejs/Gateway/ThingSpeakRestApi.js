const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

module.exports = class ThingSpeakRestApi {
    constructor(url, channel, writeKey) {
        this.url = url;
        this.channel = channel;
        this.writeKey = writeKey;
    }

    writeField(field, data) {
        var data = "api_key=" + this.writeKey + "&" + field + "=" + data;

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4 && this.status === 200) {
                console.log(this.responseText);
            }
        });

        xhr.open("POST", this.url, true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.setRequestHeader("cache-control", "no-cache");
        xhr.setRequestHeader("Postman-Token", "a117e940-ed46-4fe1-b3f4-01009285bb97");

        xhr.send(data);
    }

    readField(field) {

    }

    readFeed() {

    }
};