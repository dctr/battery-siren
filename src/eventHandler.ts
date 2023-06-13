import { ServerAPI, ToastData } from "decky-frontend-lib";
import { Settings } from "./settings";
import { BatteryState, Modules } from "./types";

export function onBatteryStateChange(
  batteryState: BatteryState,
  modules: Modules,
  settings: Settings,
  serverApi: ServerAPI
): void {
  if (batteryState.flLevel > settings.overchargeLevel) {
    const data: ToastData = {
      title: "Overcharge Level Reached",
      body: "Disconnect Charger",
    };
    serverApi.toaster.toast(data);
  }
  if (batteryState.flLevel < 10) {
    // TODO: Read setting
    modules.sleep.OnSuspendRequest();
  }
}
