const Twitter = require("twitter-lite");

module.exports = class TwitterApi {
    constructor(url, consumerKey, consumerSecret, tokenKey, tokenSecret) {
        this.url = url;
        this.consumerKey = consumerKey;
        this.consumerSecret = consumerSecret;
        this.tokenKey = tokenKey;
        this.tokenSecret = tokenSecret;
    }

    // send twitter dm to reef owner
    async sendDirectMessageEmptyBucket(recipientId) {
        var client = new Twitter({
            subdomain: "api",
            consumer_key: this.consumerKey,
            consumer_secret: this.consumerSecret,
            access_token_key: this.tokenKey,
            access_token_secret: this.tokenSecret
        });

        await client.get("account/verify_credentials").catch(console.error);

        var raw = {
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
        };

        return await client.post("direct_messages/events/new", raw);
    }
};