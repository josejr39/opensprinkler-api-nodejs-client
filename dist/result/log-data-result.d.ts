export type LogRecord = [pid: number, sid: number, dur: number, end: number] | [pid: number, sid: number, dur: number, end: number, flow: number] | [pid: 0, sid: string, dur: number, end: number];
export type LogDataResult = LogRecord[];
