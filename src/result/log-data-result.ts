export type LogRecord =
  | [pid: number, sid: number, dur: number, end: number] // Standard log entry
  | [pid: number, sid: number, dur: number, end: number, flow: number] // With flow sensor
  | [pid: 0, sid: string, dur: number, end: number]; // Special event (pid=0, sid is event type string)

export type LogDataResult = LogRecord[];