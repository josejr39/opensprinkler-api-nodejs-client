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
    nprogs: number;
    nboards: number;
    mnp: number;
    mnst: number;
    pnsize: number;
    pd: ProgramData[];
}
