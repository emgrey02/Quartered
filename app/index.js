import clock from "clock";
import { battery }from 'power';
import { HeartRateSensor } from 'heart-rate';

import { me as appbit } from 'appbit';
import { today } from "user-activity";
import { display } from "display";
import * as document from "document";
import { preferences } from "user-settings";
import * as util from "../common/utils";
import * as messaging from "messaging";
import * as settings from "./device-settings";


//define document elements
const clockLabel = document.getElementById("clock-label");
const batteryText = document.getElementById("battery-text");
const batteryLevel = document.getElementById("battery-level");

const hrText = document.getElementById("hr-text");
const stepsText = document.getElementById("steps-text");
const floorsText = document.getElementById("floors-text");
const date = document.getElementById("date");
const dayOfWeek = document.getElementById("day-of-week");
const gradientRect = document.getElementById('gradient');

if (HeartRateSensor && appbit.permissions.granted("access_heart_rate")) {
  const hrm = new HeartRateSensor();
  hrm.addEventListener("reading", () => {
    hrText.text = hrm.heartRate;
  })
  display.addEventListener("change", () => {
    display.on ? hrm.start() : hrm.stop();
  })
  hrm.start();
}

/*  -------------------------------------- CLOCK ------------------------------------- */
clock.granularity = "seconds";
clock.ontick = (evt) => {
  let today = evt.date;
  
  if (preferences.clockDisplay === '12h') {
    let hours = today.getHours() % 12;
  } else {
    let hours = today.getHours();
  }
  
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let mins = today.getMinutes();
  if (mins < 10) {
    mins = `0${mins}`;
  }
  let secs = today.getSeconds();
  if (secs < 10) {
    secs = `0${secs}`;
  }
  clockLabel.text = `${hours}:${mins}:${secs}`;
  
  let days = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];
  let months = ["Jan", "Feb",  "Mar",  "Apr",  "May",  "Jun",  "Jul",  "Aug",  "Sep",  "Oct",  "Nov", "Dec"];
  
  let day = util.zeroPad(today.getDate());
  let theDay = days[today.getDay()];
  let month = months[today.getMonth()];
  
  date.text = `${month} ${day}`;
  dayOfWeek.text = `${theDay}`;
  
  updateStats();
}

function updateStats() {
    /************* STEPS/FLOORS/BATTERY *****************/
  
  if (appbit.permissions.granted("access_activity")) {
    stepsText.text = today.adjusted.steps;
    floorsText.text = today.adjusted.elevationGain;
  }
  
  batteryLevel.width = Math.floor(battery.chargeLevel * 26 / 100);
}

/* --------------------------------------- SETTINGS --------------------------------------------- */
function settingsCallback(data) {
  if (!data) {
    return;
  }
  if (data.colorOne) {
    gradientRect.gradient.colors.c1 = data.colorOne;
  }
  if (data.colorTwo) {
    gradientRect.gradient.colors.c2 = data.colorTwo;
  }
  if (data.hideBat) {
    batteryText.text = "";
  } 
  if (!data.hideBat) {
    batteryText.text = Math.floor(battery.chargeLevel) + '%';
  }
  if (data.textColor) {
    clockLabel.style.fill = data.textColor;
  }
}

settings.initialize(settingsCallback);