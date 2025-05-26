
export enum RebootCause {
  NoneOrUnknown = 0,
  FactoryReset = 1,
  ButtonTriggered = 2,
  ResetToAPMode = 3,
  ApiOrTimerTriggered = 4,
  ApiTriggeredReboot = 5,
  SwitchFromAPToClient = 6,
  FirmwareUpdate = 7,
  WeatherCallFailed = 8,
  NetworkFailed = 9,
  NtpSync = 10,
  PowerOn = 99,
}

export enum WeatherErrorCode {
  Success = 0,
  RequestNotReceived = -1,
  CannotConnectToWeatherServer = -2,
  RequestTimeout = -3,
  ReceivedEmptyReturn = -4,
}


export interface ControllerVariablesResult {
  devt: number;           // Device time (epoch)
  nbrd: number;           // Number of 8-station boards
  en: number;             // Operation enable bit
  sn1: number;            // Sensor1 status bit
  sn2?: number;           // Sensor2 status bit (optional)
  rd: number;             // Rain delay bit
  rdst: number;           // Rain delay stop time
  sunrise: number;        // Sunrise time (minutes from midnight)
  sunset: number;         // Sunset time (minutes from midnight)
  eip: number;            // External IP
  lwc: number;            // Last weather call (epoch)
  lswc: number;           // Last weather call response (epoch)
  lupt: number;           // Last device reboot time (epoch)
  lrbtc: RebootCause;     // Cause of last reboot
  lrun: [number, number, number, number]; // Last run record
  RSSI?: number;          // WiFi signal strength (optional)
  mac: string;            // MAC address
  loc: string;            // GPS coordinates
  jsp: string;            // Javascript URL
  wsp: string;            // Weather script URL
  wto: any;               // Weather adjustment options (structure depends on method)
  wtdata: any;            // Raw weather data
  wterr: WeatherErrorCode; // Weather error code
  ifkey: string;          // IFTTT Webhooks key
  mqtt: any;              // MQTT configuration
  curr?: number;          // Total current draw (optional)
  sbits: number[];        // Station status bits
  ps: [number, number, number, number][]; // Program status data
  flwrt: number;          // Flow count window (seconds)
  flcrt: number;          // Real-time flow count
  pq: number;             // Pause state
  pt: number;             // Pause timer (seconds)
  nq: number;             // Number of elements in program queue
  otc: any;               // OTC configuration
  otcs: number;           // OTC connection status
  dname: string;          // Device name
  gpio: number[];         // Free GPIO pins
  email: any;             // Email notification settings
}
