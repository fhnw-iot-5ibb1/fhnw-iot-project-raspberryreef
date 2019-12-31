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
                        "text": "Hey Reefer! The refill bucket is empty. Please fill it up with pure RODI water. Happy reefing!"
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

        xhr.open("POST", "https://api.twitter.com/1.1/direct_messages/events/new.json");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("Authorization", "OAuth oauth_consumer_key=\"TSR8o5gA1X6ZU5MMdgrdNrMvZ\",oauth_token=\"1125735237009510400-8QqpyyIXzZ5l5EL3XbFyAD4g8Gr373\",oauth_signature_method=\"HMAC-SHA1\",oauth_timestamp=\"1577785001\",oauth_nonce=\"lkZWE4VAv9F\",oauth_version=\"1.0\",oauth_signature=\"rCufRZZjySdoGdgRauU2nM6TbLk%3D\"");
        xhr.setRequestHeader("User-Agent", "PostmanRuntime/7.20.1");
        xhr.setRequestHeader("Accept", "*/*");
        xhr.setRequestHeader("Cache-Control", "no-cache");
        xhr.setRequestHeader("Postman-Token", "01c4c201-26c0-401e-957f-e58d68083642,63392139-6265-4037-b5fa-1d1c81489830");
        
        xhr.send(data);
    }
};