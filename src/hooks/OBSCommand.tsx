import OBSWebSocket from "obs-websocket-js";

export const OBSCommand = async (requestType: any, requestData: any) => {
  console.log("OBSCommand: ", requestType, requestData);
  try {
    const obs = new OBSWebSocket();
    await obs.connect();
    //this may return where the screne shot has been saved
    await obs.call("TriggerHotkeyByName", {
      hotkeyName: "OBSBasic.Screenshot",
    });
    await obs.disconnect();
  } catch (e) {
    console.log(e);
  }
};
