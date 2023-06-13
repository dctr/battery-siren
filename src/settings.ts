const PLUGIN_LOCAL_STORAGE_KEY = "batterySiren";

const DEFAULT_SETTINGS: Settings = {
  overchargeLevel: 80,
};

export interface Settings {
  overchargeLevel: number;
}

export function getSettings(): Settings {
  const stored = localStorage.getItem(PLUGIN_LOCAL_STORAGE_KEY);
  if (!stored) {
    return DEFAULT_SETTINGS;
  }
  return JSON.parse(stored);
}

export function storeSettings(settings: Settings) {
  localStorage.setItem(PLUGIN_LOCAL_STORAGE_KEY, JSON.stringify(settings));
}
