export type ProgramData = [
  flag: number,
  days0: number,
  days1: number,
  starts: [number, number, number, number],
  durations: number[],
  name: string,
  dateRange: [endr: number, from: number, to: number]
];

export interface ProgramDataResult {
  nprogs: number;      // Number of existing programs
  nboards: number;     // Number of 8-zone groups (including the main controller)
  mnp: number;         // Maximum number of programs allowed
  mnst: number;        // Maximum number of program start times allowed
  pnsize: number;      // Maximum number of characters allowed for the program name
  pd: ProgramData[];   // Array of program data
}