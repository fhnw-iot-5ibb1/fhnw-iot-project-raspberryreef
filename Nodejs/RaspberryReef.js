const ThingSpeakRestApi = require('./Gateway/ThingSpeakRestApi');
const TempSensor = require('./Sensors/TempSensor');
const WaterLevelSensor = require('./Sensors/WaterLevelSensor')
const Relay = require('./Actuators/Relay');

var ThingSpeakApi = new ThingSpeakRestApi('https://api.thingspeak.com/update.json', '909274', 'BG3OF4PS64WT3GOB');
var TempSensor_Ground = new TempSensor('28-031622932eff', 3, 'field1');
var TempSensor_Surface = new TempSensor('28-041621ea95ff', 3, 'field2');
var WaterLevelSensor_ReefMin = new WaterLevelSensor(17, 'field3');
var WaterLevelSensor_ReefMax = new WaterLevelSensor(18, 'field4');
var WaterLevelSensor_RefillMin = new WaterLevelSensor(27, 'field5');
var LedLamp_Left = new Relay(22, 'field6');
var LedLamp_Right = new Relay(23, 'field7');
var RefillPump = new Relay(24, 'field8');

// TODO: Handle Lights...
// TODO: Create Lights API availabel.
setInterval(checkWaterLevel(), 300000);         // Check Reef Water Level every 5 Minutes. Refill if needed.
setInterval(updateThingSpeakFeed(), 300000);    // Update ThingSpeak Temp Fields every 5 Minutes.

function checkWaterLevel() {
    var reefMin = WaterLevelSensor_ReefMin.getState();

    if (reefMin === 1) {
        var refillMin = WaterLevelSensor_RefillMin.getState();

        if (refillMin === 0) {
            var refillInterval = setInterval(function () { startRefillProcess(refillInterval) }, 1000);
        }
    }
}

function startRefillProcess(refillInterval) {
    var reefMax = WaterLevelSensor_ReefMax.getState();
    var refillMin = WaterLevelSensor_RefillMin.getState();

    if (reefMax === 0 && refillMin === 0) {
        if (RefillPump.getState == 0) {
            RefillPump.setStateActive();
            ThingSpeakApi.writeField(RefillPump.getThingSpeakField(), RefillPump.getState());
        }
    } else if (reefMax === 0 && refillMin === 1) {
        // TODO: Only update when not already updated...
        if (RefillPump.getState() === 1) {
            RefillPump.setStateInactive();
            ThingSpeakApi.writeField(RefillPump.getThingSpeakField(), RefillPump.getState());
            ThingSpeakApi.writeField(WaterLevelSensor_ReefMin.getThingSpeakField(), WaterLevelSensor_ReefMin.getState());
            ThingSpeakApi.writeField(WaterLevelSensor_ReefMax.getThingSpeakField(), WaterLevelSensor_ReefMax.getState());
            ThingSpeakApi.writeField(WaterLevelSensor_RefillMin.getThingSpeakField(), WaterLevelSensor_RefillMin.getState());
            // Send email
        }
        clearInterval(refillInterval);
    } else {
        if (RefillPump.getState === 1) {
            RefillPump.setStateInactive();
            ThingSpeakApi.writeField(RefillPump.getThingSpeakField(), RefillPump.getState());
            ThingSpeakApi.writeField(WaterLevelSensor_ReefMin.getThingSpeakField(), WaterLevelSensor_ReefMin.getState());
            ThingSpeakApi.writeField(WaterLevelSensor_ReefMax.getThingSpeakField(), WaterLevelSensor_ReefMax.getState());
            ThingSpeakApi.writeField(WaterLevelSensor_RefillMin.getThingSpeakField(), WaterLevelSensor_RefillMin.getState());
        }
        clearInterval(refillInterval);
    }
}

function updateThingSpeakFeed() {
    sendActuatorData();
    sendSensorData();
}

function sendActuatorData() {
    ThingSpeakApi.writeField(LedLamp_Left.getThingSpeakField(), LedLamp_Left.getState());
    ThingSpeakApi.writeField(LedLamp_Right.getThingSpeakField(), LedLamp_Right.getState());
    ThingSpeakApi.writeField(RefillPump.getThingSpeakField(), RefillPump.getState());
}

function sendSensorData() {
    ThingSpeakApi.writeField(TempSensor_Ground.getThingSpeakField(), TempSensor_Ground.getTemp());
    ThingSpeakApi.writeField(TempSensor_Surface.getThingSpeakField(), TempSensor_Surface.getTemp());
    ThingSpeakApi.writeField(WaterLevelSensor_ReefMin.getThingSpeakField(), WaterLevelSensor_ReefMin.getState());
    ThingSpeakApi.writeField(WaterLevelSensor_ReefMax.getThingSpeakField(), WaterLevelSensor_ReefMax.getState());
    ThingSpeakApi.writeField(WaterLevelSensor_RefillMin.getThingSpeakField(), WaterLevelSensor_RefillMin.getState());
}