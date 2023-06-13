import { Module } from "decky-frontend-lib";

export interface BatteryState {
  bHasBattery: boolean;
  bShutdownRequested: boolean;
  eACState: number;
  flLevel: number;
  nSecondsRemaining: number;
}

export interface Modules {
  sleep: Module;
  toast: Module;
}
