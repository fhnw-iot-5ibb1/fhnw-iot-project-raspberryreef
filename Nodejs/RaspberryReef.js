const ThingSpeakRestApi = require('./Gateway/ThingSpeakRestApi');
const TempSensor = require('./Sensors/TempSensor');
const WaterLevelSensor = require('./Sensors/WaterLevelSensor');
const Relay = require('./Actuators/Relay');
const LightManager = require('./Timer/LightManager');

var thingSpeakApi = new ThingSpeakRestApi('https://api.thingspeak.com/update.json', '909274', 'BG3OF4PS64WT3GOB');
var tempSensor_Ground = new TempSensor('28-031622932eff', 3, 'field1');
var tempSensor_Surface = new TempSensor('28-041621ea95ff', 3, 'field2');
var waterLevelSensor_ReefMin = new WaterLevelSensor(17, 'field3');
var waterLevelSensor_ReefMax = new WaterLevelSensor(18, 'field4');
var waterLevelSensor_RefillMin = new WaterLevelSensor(27, 'field5');
var ledLamp_Left = new Relay(22, 'field6');
var ledLamp_Right = new Relay(23, 'field7');
var refillPump = new Relay(24, 'field8');

var initialDate = new Date();
var initialSunrise = new Date(initialDate.getFullYear, initialDate.getMonth, 10, 0, 0, 0);
var initialSunset = new Date(initialDate.getFullYear, initialDate.getMonth, 22, 0, 0, 0);
var ledLightManager = new LightManager(initialSunrise, null, null, initialSunset);

setInterval(handleLights(), 60000);             // Check the light every minute
setInterval(checkWaterLevel(), 300000);         // Check Reef Water Level every 5 Minutes. Refill if needed.
setInterval(sendTempSensorData(), 300000);      // Update ThingSpeak Temp Fields every 5 Minutes.

function handleLights() {
    var lightShouldBeOn = ledLightManager.getLightShouldBeOn();

    if (lightShouldBeOn && ledLamp_Left.getState() != 1) {
        ledLamp_Left.setStateActive();
        thingSpeakApi.writeField(ledLamp_Left.getThingSpeakField(), ledLamp_Left.getState());
    } else if (!lightShouldBeOn && ledLamp_Left.getState != 0) {
        ledLamp_Left.setStateInactive();
        thingSpeakApi.writeField(ledLamp_Left.getThingSpeakField(), ledLamp_Left.getState());
    }

    if (lightShouldBeOn && ledLamp_Right.getState() != 1) {
        ledLamp_Right.setStateActive();
        thingSpeakApi.writeField(ledLamp_Right.getThingSpeakField(), ledLamp_Right.getState());
    } else if (!lightShouldBeOn && ledLamp_Right.getState != 0) {
        ledLamp_Right.setStateInactive();
        thingSpeakApi.writeField(ledLamp_Right.getThingSpeakField(), ledLamp_Right.getState());
    }
}

function checkWaterLevel() {
    var reefMin = waterLevelSensor_ReefMin.getState();

    if (reefMin === 1) {
        var refillMin = waterLevelSensor_RefillMin.getState();

        if (refillMin === 0) {
            var refillInterval = setInterval(function () { startRefillProcess(refillInterval) }, 1000);
        }
    }
}

function startRefillProcess(refillInterval) {
    var reefMax = waterLevelSensor_ReefMax.getState();
    var refillMin = waterLevelSensor_RefillMin.getState();

    if (reefMax === 0 && refillMin === 0) {
        if (refillPump.getState === 0) {
            refillPump.setStateActive();
            thingSpeakApi.writeField(refillPump.getThingSpeakField(), refillPump.getState());
        }
    } else if (reefMax === 0 && refillMin === 1) {
        // TODO: Only update when not already updated...
        if (refillPump.getState() === 1) {
            refillPump.setStateInactive();
            thingSpeakApi.writeField(refillPump.getThingSpeakField(), refillPump.getState());
            thingSpeakApi.writeField(waterLevelSensor_ReefMin.getThingSpeakField(), waterLevelSensor_ReefMin.getState());
            thingSpeakApi.writeField(waterLevelSensor_ReefMax.getThingSpeakField(), waterLevelSensor_ReefMax.getState());
            thingSpeakApi.writeField(waterLevelSensor_RefillMin.getThingSpeakField(), waterLevelSensor_RefillMin.getState());
            // Send email
        }
        clearInterval(refillInterval);
    } else {
        if (refillPump.getState === 1) {
            refillPump.setStateInactive();
            thingSpeakApi.writeField(refillPump.getThingSpeakField(), refillPump.getState());
            thingSpeakApi.writeField(waterLevelSensor_ReefMin.getThingSpeakField(), waterLevelSensor_ReefMin.getState());
            thingSpeakApi.writeField(waterLevelSensor_ReefMax.getThingSpeakField(), waterLevelSensor_ReefMax.getState());
            thingSpeakApi.writeField(waterLevelSensor_RefillMin.getThingSpeakField(), waterLevelSensor_RefillMin.getState());
        }
        clearInterval(refillInterval);
    }
}

function sendTempSensorData() {
    thingSpeakApi.writeField(tempSensor_Ground.getThingSpeakField(), tempSensor_Ground.getTemp());
    thingSpeakApi.writeField(tempSensor_Surface.getThingSpeakField(), tempSensor_Surface.getTemp());
}