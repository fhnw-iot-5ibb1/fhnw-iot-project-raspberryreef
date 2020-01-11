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
### Controller
My device of choice is a Raspberry Pi 3 B+ which I already had at home but have never really used until now. It runs Raspbian Buster Lite with Node.js and several node libraries.

#### Software Setup
The following setup steps are required to successfully run RaspberryReef on a Raspberry Pi 3 B+.
* Enable SSH
* Enable Wi-Fi
* Install git
    * *sudo apt-get install git*
* Install Node.js
    * *wget https://nodejs.org/dist/v13.6.0/node-v13.6.0-linux-armv7l.tar.gz*
    * *tar -xzf node-v13.6.0-linux-armv7l.tar.gz*
    * *cd node-v13.6.0-linux-armv7l/*
    * *sudo cp -R * /usr/local/*
* Install Node libraries
    * ds18b20-rasp (1-Wire Temp. Sensor)
        * *npm i ds18b20-raspi*
        * https://www.npmjs.com/package/ds18b20-raspi
    * Node Fetch (Fetch API)
        * *npm i node-fetch*
        * https://www.npmjs.com/package/node-fetch
    * onoff (GPIO)
        * *npm install onoff*
        * https://www.npmjs.com/package/onoff
    * Twitter Lite (Twitter Library)
        * *npm i twitter-lite*
        * https://www.npmjs.com/package/twitter-lite
    * Nohub (Process Controller)
        * *npm i nohup -g*
        * https://www.npmjs.com/package/nohup
* Activate 1-Wire Sensor on Pi
    * *sudo nano /boot/config.txt* -> add line: *dtoverlay=w1–gpio*

### Sensors
Magnetic water level sensor. Activates when the floating ring has contact with the clamp.  
https://de.aliexpress.com/item/32909017788.html?spm=a2g0s.9042311.0.0.2c124c4dlrpVlE

<img src="Images/Sensors/WaterLevel.jpg" width="640"/>

Water proof temperature sensor. Measures temperature in degree Celsius.  
https://de.aliexpress.com/item/33032061557.html

<img src="Images/Sensors/Temp.jpg" width="640"/>

### Actuator

5v AC and DC Relay. Used to controll the refill pump and the led lights.  
https://de.aliexpress.com/item/32888878613.html

<img src="Images/Actuators/Relay.jpg" width="640"/>

### Ohter hardware

12v DC refill pump with power plug and tube.  
https://de.aliexpress.com/item/32859196804.html  
https://de.aliexpress.com/item/33035018517.html

<img src="Images/Others/Pump.jpg" width="640"/>

LED reef aquarium lamp.

<img src="Images/Others/LED_Lamp.jpg" width="640"/>

Resistors in different sizes.  
https://de.aliexpress.com/item/32840627690.html

<img src="Images/Others/Resistors.jpg" width="640"/>

Connection wires.

<img src="Images/Others/Wire.jpg" width="640"/>

Soldering iron and solder.

<img src="Images/Others/Soldering.jpg" width="640"/>

My Reef Aquarium.

<img src="Images/Others/Aquarium.jpg" width="640"/>

### Hardware Wiring
Since I wanted to use the GPIO pins of my Raspberry Pi directly and without a grove base hat I needed to wire all the sensors and actuators by myself. For prototyping I used jumper cables, wires and a breadboard. The wiring diagram below represents my prototype. It was created with the Fritzing tool.

<img src="Images/Others/Fritzing.jpg" width="640"/>

Since my actual breadboard was smaller than the one I used in my Fritzing, the actual Device looks a little different.

<img src="Images/Others/Device.jpg" width="640"/>

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
