import { settingsStorage } from "settings";
import * as messaging from "messaging";
import { me as companion } from "companion";


settingsStorage.addEventListener("change", evt => {
  if (evt.oldValue !== evt.newValue) {
    sendValue(evt.key, evt.newValue);
  }
});

if (companion.launchReasons.settingsChanged) {
  sendValue("colorOne", settingsStorage.getItem("first-color"));
  sendValue("colorTwo", settingsStorage.getItem("second-color"));
  sendValue("hideBat", settingsStorage.getItem("hideBat"));
}

function sendValue(key, val) {
  if (val) {
    sendSettingsData({
      key: key,
      value: JSON.parse(val)
    });
  }
}

function sendSettingsData(data) {
  // If we have a MessageSocket, send the data to the device
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    messaging.peerSocket.send(data);
  } else {
    console.log("No peerSocket connection");
  }
}

