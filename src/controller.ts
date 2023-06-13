import { Module, ServerAPI, findModuleChild } from "decky-frontend-lib";
import { getSettings, storeSettings } from "./settings";
import { BatteryState, Modules } from "./types";
import { onBatteryStateChange } from "./eventHandler";

export function initializeController(serverApi: ServerAPI) {
  let currentBatteryState: BatteryState;
  const settings = getSettings();
  const modules: Modules = {
    sleep: findModule("InitiateSleep"),
    toast: findModule("ToastMisc"),
  };

  const intervalId = setInterval(() => {
    // @ts-ignore
    currentBatteryState = window.SystemPowerStore.batteryState;
    onBatteryStateChange(currentBatteryState, modules, settings, serverApi);
  }, 1000);

  return {
    settings,
    getBatteryState: () => currentBatteryState,
    onDismount: () => {
      // TODO: Use this function
      clearInterval(intervalId);
    },
    setOverchargeLevel: (value: number) => {
      settings.overchargeLevel = value;
      storeSettings(settings);
      return settings.overchargeLevel;
    },
  };
}

function findModule(property: string) {
  return findModuleChild((m: Module) => {
    if (typeof m !== "object") return undefined;
    for (let prop in m) {
      try {
        if (m[prop][property]) {
          return m[prop];
        }
      } catch (e) {
        return undefined;
      }
    }
  });
}
