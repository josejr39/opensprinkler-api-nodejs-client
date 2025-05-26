export interface GetStationNamesAndAttributesResult {
  snames: string[];        // Array of station names
  maxlen: number;          // Maximum number of characters allowed in each station name
  masop: number[];         // Master operation flags (bit field, one byte per 8-zone group)
  masop2: number[];        // Master2 operation flags (bit field, one byte per 8-zone group)
  ignore_rain: number[];   // Ignore rain delay flags (bit field, one byte per 8-zone group)
  ignore_sn1: number[];    // Ignore sensor1 flags (bit field, one byte per 8-zone group)
  ignore_sn2: number[];    // Ignore sensor2 flags (bit field, one byte per 8-zone group)
  stn_dis: number[];       // Zone disable flags (bit field, one byte per 8-zone group)
  stn_spe: number[];       // Special station flags (bit field, one byte per 8-zone group)
  stn_grp: number[];       // Zone's sequential group id (0-254: sequential, 255: parallel)
}