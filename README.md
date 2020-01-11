# IoT Engineering
## Project RaspberryReef
RaspberryReef is a prototype of a reef management system. One of its purposes is to manage the refill process of a reef aquarium. Salt concentration is an important part of reefing. The right amount of salt in the water helps every reef to be stable and healthy which is essential for all fish, corals and sea anemones. Therefore, evaporated water needs to be refilled quickly. RaspberryReef can get this job done. Furthermore, temperature is measured every five minutes and published to the web. Another critical success factor of every reef aquarium is light. Most corals have bacteria on them which turn light into sugar. The sugar is then consumed by the coral. Light can be controlled by RaspberryReef, too. The whole application is written in JavaScript with Node.js and runs on a Raspberry Pi 3 B+. All measurements and other GPIO values are published to the web.

<img src="Images/Others/ProjectIdea.jpg" width="640"/>

## Introduction
This project is part of the [IoT Engineering](../../../fhnw-iot) course.

* 2-person teams, building an IoT system.
* 32 hours of work per person, 1 prototype.
* 10' presentation of the project at Demo Day.
* Slides, source code and setup steps on GitHub.
* Both team members are able to explain the project.

### Team members
* @jonathan-baettig & @jbaettig, Jonathan James Bättig

## Project Setup
### Sensor and Actuator Device
<img src="Images/Others/Device.jpg" width="640"/>

### Sensors
<img src="Images/Sensors/WaterLevel.jpg" width="640"/>
<img src="Images/Sensors/Temp.jpg" width="640"/>

### Actuator
<img src="Images/Actuators/Relay.jpg" width="640"/>

### Ohter hardware
<img src="Images/Others/Pump.jpg" width="640"/>
<img src="Images/Others/Resistors.jpg" width="640"/>
<img src="Images/Others/Wire.jpg" width="640"/>
<img src="Images/Others/Soldering.jpg" width="640"/>

## Deliverables
### Source code
The entire source code of my project is committed to this repository. All code is written in JavaScript with Node.js.

#### Main Application
* [Nodejs/RaspberryReef.js](Nodejs/RaspberryReef.js)

#### Sensors
* [Nodejs/Sensors/TempSensor.js](Nodejs/Sensors/TempSensor.js)
* [Nodejs/Sensors/WaterLevelSensor.js](Nodejs/Sensors/TempSensor.js)

#### Actuators
* [Nodejs/Actuators/Relay.js](Nodejs/Actuators/Relay.js)

#### Timer
* [Nodejs/Timer/LightManager.js](Nodejs/Timer/LightManager.js)

#### Gateway
* [Nodejs/Gateway/ThingSpeakRestApi.js](Nodejs/Gateway/ThingSpeakRestApi.js)
* [Nodejs/Gateway/TwitterApi.js](Nodejs/Gateway/TwitterApi.js)


### Presentation
4-slide PDF presentation
* [Presentation/RaspberryReef.pdf](Presentation/RaspberryReef.pdf)

1) Use-case of your project.
2) Reference model of your project.
3) Single slide interface documentation.
4) Issues you faced, how you solved them.

### Live demo
Working end-to-end prototype, "device to cloud", part of your 10' presentation.

[https://MY_TEAM_PROJECT_DEMO_HOST:PORT/](https://MY_TEAM_PROJECT_DEMO_HOST:PORT/)

1) Sensor input on a IoT device triggers an event.
2) The event or measurement shows up online, in an app or Web client.
3) The event triggers actuator output on the same or on a separate IoT device.

## Submission deadline
Commit and push to (this) project repo before Demo Day, _13.01.2020, 00:00_.
