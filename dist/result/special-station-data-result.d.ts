export declare enum SpecialStationType {
    Standard = 0,
    RF = 1,
    RemoteIP = 2,
    GPIO = 3,
    HTTP = 4,
    HTTPS = 5,
    RemoteOTC = 6
}
export interface SpecialStationData {
    st: SpecialStationType;
    sd: string;
}
export interface SpecialStationDataResult {
    [stationId: string]: SpecialStationData;
}
