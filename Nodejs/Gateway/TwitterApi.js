const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

module.exports = class TwitterApi {
    constructor(url, consumerKey, token) {
        this.url = url;
        this.consumerKey = consumerKey;
        this.token = token;
    }

    sendDirectMessageEmptyBucket(recipientId) {
        var data = JSON.stringify({
            "event": {
                "type": "message_create",
                "message_create": {
                    "target": {
                        "recipient_id": recipientId
                    },
                    "message_data": {
                        "text": "Hey Reefer. The refill Bucket is empty. Please fill it up with pure RODI water."
                    }
                }
            }
        });

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                console.log(this.responseText);
            }
        });

        xhr.open("POST", url);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("Authorization", "OAuth oauth_consumer_key=\"" + this.consumerKey + "\",oauth_token=\"" + this.token + "\"");
        xhr.setRequestHeader("Accept", "*/*");
        xhr.setRequestHeader("Cache-Control", "no-cache");
        xhr.setRequestHeader("Postman-Token", "79af4e1f-e0d5-445d-a365-2eaa4c611d89,30a77e52-9946-4d5e-b67a-3aee390d4c6a");
        xhr.setRequestHeader("Host", "api.twitter.com");
        xhr.setRequestHeader("Accept-Encoding", "gzip, deflate");
        xhr.setRequestHeader("Content-Length", "249");
        xhr.setRequestHeader("Connection", "keep-alive");

        xhr.send(data);
    }
};