const fetch = require("node-fetch");

module.exports = class ThingSpeakRestApi {
    constructor(url, channel, writeKey) {
        this.url = url;
        this.channel = channel;
        this.writeKey = writeKey;
    }

    async postFields(values) {
        var data = "api_key=" + this.writeKey + values;

        const response = await fetch(this.url, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: data
          });
          return await response.json();
    }
};