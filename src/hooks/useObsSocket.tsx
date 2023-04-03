import { useEffect, useState } from "react";
import OBSWebSocket from "obs-websocket-js";

export const useObsSocket = () => {
  const [obs, setObs] = useState<any>(null);

  useEffect(() => {
    const obs = new OBSWebSocket();
    obs.connect();
    setObs(obs);
  }, []);

  return obs;
};
