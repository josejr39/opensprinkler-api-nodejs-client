export enum SpecialStationType {
  Standard = 0,
  RF = 1,
  RemoteIP = 2,
  GPIO = 3,
  HTTP = 4,
  HTTPS = 5,
  RemoteOTC = 6,
}

export interface SpecialStationData {
  st: SpecialStationType;   // Special station type
  sd: string;               // Special station data (format depends on st)
}

export interface SpecialStationDataResult {
  [stationId: string]: SpecialStationData;
}