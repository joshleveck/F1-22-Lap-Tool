export interface row {
  id: number;
  track: string;
  startDistance: number;
  finalDistance: number;
  delta: number;
  but1?: JSX.Element;
  but2?: JSX.Element;
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
