export interface row {
  id: number;
  track: string;
  startDistance: number;
  finalDistance: number;
  delta: number;
}

export interface selectOption {
  value: string;
  label: string;
}

export interface lapSelectValues {
  id: number;
  lapType: string;
  circuit: string;
  driver: string;
  personalLap: row | "";
}