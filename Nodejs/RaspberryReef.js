const ThingSpeakRestApi = require('./Gateway/ThingSpeakRestApi');
const TwitterApi = require('./Gateway/TwitterApi');
const TempSensor = require('./Sensors/TempSensor');
const WaterLevelSensor = require('./Sensors/WaterLevelSensor');
const Relay = require('./Actuators/Relay');
const LightManager = require('./Timer/LightManager');
var refillBucketEmpty = false;

var thingSpeakApi = new ThingSpeakRestApi('https://api.thingspeak.com/update.json', '909274', 'BG3OF4PS64WT3GOB');
var twitterApi = new TwitterApi("https://api.twitter.com/1.1/direct_messages/events/new.json", "TSR8o5gA1X6ZU5MMdgrdNrMvZ", "pHSMbNld16i2yTy3CKkewA6C4cNd4MgyqiLQQhaHSbWWq9W3uI", "1125735237009510400-8QqpyyIXzZ5l5EL3XbFyAD4g8Gr373", "OSMkf9hbVIbNHlkVlNxOKLYh5YWaqaYxmmWmobKbYXNTr");
var tempSensor_Ground = new TempSensor('28-031622932eff', 3, 'field1');
var tempSensor_Surface = new TempSensor('28-041621ea95ff', 3, 'field2');
var waterLevelSensor_ReefMin = new WaterLevelSensor(17, 'field3');
var waterLevelSensor_ReefMax = new WaterLevelSensor(18, 'field4');
var waterLevelSensor_RefillMin = new WaterLevelSensor(27, 'field5');
var ledLamp_Left = new Relay(22, 'field6');
var ledLamp_Right = new Relay(23, 'field7');
var refillPump = new Relay(24, 'field8');

var initialDate = new Date();
var initialSunrise = new Date(initialDate.getFullYear(), initialDate.getMonth(), initialDate.getDate(), 10, 0, 0);
var initialSunset = new Date(initialDate.getFullYear(), initialDate.getMonth(), initialDate.getDate(), 22, 0, 0);
var ledLightManager = new LightManager(initialSunrise, null, null, initialSunset);

setInterval(() => handleLights(), 60000);             // Check the light every minute
setInterval(() => checkWaterLevel(), 300000);         // Check Reef Water Level every 5 Minutes. Refill if needed.
setInterval(() => sendTempSensorData(), 300000);      // Update ThingSpeak Temp Fields every 5 Minutes.

function handleLights() {
    var lightShouldBeOn = ledLightManager.getLightShouldBeOn();
    console.log('Should the lights be on? => ' + lightShouldBeOn);
    var data = "";

    if (lightShouldBeOn && ledLamp_Left.getState() != 1) {
        console.log('Going to turn on the left lamp.');
        ledLamp_Left.setStateActive();
        data += "&" + ledLamp_Left.getThingSpeakField() + "=" + ledLamp_Left.getState();
    } else if (!lightShouldBeOn && ledLamp_Left.getState() != 0) {
        console.log('Going to turn off the left lamp.');
        ledLamp_Left.setStateInactive();
        data += "&" + ledLamp_Left.getThingSpeakField() + "=" + ledLamp_Left.getState();
    }

    if (lightShouldBeOn && ledLamp_Right.getState() != 1) {
        console.log('Going to turn on the right lamp.');
        ledLamp_Right.setStateActive();
        data += "&" + ledLamp_Right.getThingSpeakField() + "=" + ledLamp_Right.getState();
    } else if (!lightShouldBeOn && ledLamp_Right.getState() != 0) {
        console.log('Going to turn the right lamp.');
        ledLamp_Right.setStateInactive();
        data += "&" + ledLamp_Right.getThingSpeakField() + "=" + ledLamp_Right.getState();
    }

    if (data != "") {
        thingSpeakApi.postFields(data)
            .then((response) => {
                console.log('Lamp data was sent.');
                console.log(response);
            })
            .catch((error) => {
                console.error('Error:', error);
                console.log('Lamp data could not be sent.');
            });
    }
}

function checkWaterLevel() {
    var reefMin = waterLevelSensor_ReefMin.getState();

    if (reefMin === 1) {
        console.log('Reef needs to be refilled.');
        var refillMin = waterLevelSensor_RefillMin.getState();

        if (refillMin === 0) {
            refillBucketEmpty = false;
            console.log('Refill bucket contains water. Start the refill process.');
            var refillInterval = setInterval(function () { startRefillProcess(refillInterval) }, 1000);
        } else {
            if (!refillBucketEmpty) {
                refillBucketEmpty = true;
                console.log('Refill bucket is empty! Send a tweet to the reef owner!');
                twitterApi.sendDirectMessageEmptyBucket(1125735237009510400)
                    .then(results => { console.log("results", results); })
                    .catch(console.error);
            }
        }
    }
}

function startRefillProcess(refillInterval) {
    var reefMax = waterLevelSensor_ReefMax.getState();
    var refillMin = waterLevelSensor_RefillMin.getState();
    var data = "";

    if (reefMax === 0 && refillMin === 0) {
        refillBucketEmpty = false;
        if (refillPump.getState() === 0) {
            console.log('Starting the refill process.');
            refillPump.setStateActive();
            data += "&" + refillPump.getThingSpeakField() + "=" + refillPump.getState();
        }
    } else if (reefMax === 0 && refillMin === 1) {
        if (refillPump.getState() === 1) {
            if (!refillBucketEmpty) {
                refillBucketEmpty = true;
                refillPump.setStateInactive();
                data += "&" + refillPump.getThingSpeakField() + "=" + refillPump.getState();
                data += "&" + waterLevelSensor_ReefMin.getThingSpeakField() + "=" + waterLevelSensor_ReefMin.getState();
                data += "&" + waterLevelSensor_ReefMax.getThingSpeakField() + "=" + waterLevelSensor_ReefMax.getState();
                data += "&" + waterLevelSensor_RefillMin.getThingSpeakField() + "=" + waterLevelSensor_RefillMin.getState();
                console.log('Refill bucket is empty! Send a tweet to the reef owner!');
                twitterApi.sendDirectMessageEmptyBucket(1125735237009510400)
                    .then(results => { console.log("results", results); })
                    .catch(console.error);
            }
        }
        clearInterval(refillInterval);
    } else {
        if (refillPump.getState() === 1) {
            console.log('Reef succsessfully refilled.');
            refillPump.setStateInactive();
            data += "&" + refillPump.getThingSpeakField() + "=" + refillPump.getState();
            data += "&" + waterLevelSensor_ReefMin.getThingSpeakField() + "=" + waterLevelSensor_ReefMin.getState();
            data += "&" + waterLevelSensor_ReefMax.getThingSpeakField() + "=" + waterLevelSensor_ReefMax.getState();
            data += "&" + waterLevelSensor_RefillMin.getThingSpeakField() + "=" + waterLevelSensor_RefillMin.getState();
        }
        clearInterval(refillInterval);
    }

    if (data != "") {
        thingSpeakApi.postFields(data)
            .then((response) => {
                console.log(response);
                console.log('Refill sensor and actuator data was sent.');
            })
            .catch((error) => {
                console.error('Error:', error);
                console.log('Refill sensor and actuator data could not be sent.');
            });
    }
}

function sendTempSensorData() {
    var data = "&" + tempSensor_Ground.getThingSpeakField() + "=" + tempSensor_Ground.getTemp() + "&"
        + tempSensor_Surface.getThingSpeakField() + "=" + tempSensor_Surface.getTemp();

    console.log('Sending temp sensor data to Thingspeak.');
    thingSpeakApi.postFields(data)
        .then((response) => {
            console.log('Temp sensor data was sent.');
            console.log(response);
        })
        .catch((error) => {
            console.error('Error:', error);
            console.log('Temp sensor could not be sent.');
        });
}