const nodeos = require('os');

function withV() {
    return "PM2 v4.40"
}

function operatingSystem() {
    return "Linux, Raspberry Pi OS"
}

function device() {
    return "Raspberry Pi 3"
}

module.exports = { device, withV, operatingSystem };