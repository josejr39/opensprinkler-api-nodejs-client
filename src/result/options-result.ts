export interface OptionsResult {
  fwv: number;         // Firmware version (RO)
  fwm: number;         // Firmware minor revision (RO)
  tz: number;          // Time zone
  dhcp: number;        // Use DHCP (1: Yes; 0: No)
  ip1: number;         // Static IP bytes
  ip2: number;
  ip3: number;
  ip4: number;
  gw1: number;         // Gateway IP bytes
  gw2: number;
  gw3: number;
  gw4: number;
  dns1: number;        // DNS IP bytes
  dns2: number;
  dns3: number;
  dns4: number;
  subn1: number;       // Subnet mask bytes
  subn2: number;
  subn3: number;
  subn4: number;
  ntp: number;         // Use NTP sync (1: Yes; 0: No)
  ntp1: number;        // NTP server IP bytes
  ntp2: number;
  ntp3: number;
  ntp4: number;
  hp0: number;         // HTTP port lower byte
  hp1: number;         // HTTP port upper byte
  hwv: number;         // Hardware version (RO)
  hwt: number;         // Hardware type (RO)
  ext: number;         // Number of 8-station expansion boards
  sdt: number;         // Station delay time (seconds)
  mas: number;         // Master station 1 index
  mas2: number;        // Master station 2 index
  mton: number;        // Master 1 On Adjusted time
  mton2: number;       // Master 2 On Adjusted time
  mtof: number;        // Master 1 Off Adjusted time
  mtof2: number;       // Master 2 Off Adjusted time
  sn1t: number;        // Sensor 1 type
  sn1o: number;        // Sensor 1 option
  sn1on: number;       // Sensor 1 delayed-on time
  sn1of: number;       // Sensor 1 delayed-off time
  sn2t: number;        // Sensor 2 type
  sn2o: number;        // Sensor 2 option
  sn2on: number;       // Sensor 2 delayed-on time
  sn2of: number;       // Sensor 2 delayed-off time
  wl: number;          // Water level (%)
  den: number;         // Operation enable bit
  ipas: number;        // Ignore password
  devid: number;       // Device ID
  con: number;         // LCD contrast
  lit: number;         // LCD backlight
  dim: number;         // LCD dimming
  bst: number;         // Boost time (ms)
  uwt: number;         // Weather adjustment method
  lg: number;          // Enable logging
  fpr0: number;        // Flow pulse rate lower byte
  fpr1: number;        // Flow pulse rate upper byte
  re: number;          // Remote extension mode
  dexp: number;        // Detected number of zone expanders (RO)
  mexp: number;        // Maximum number of zone expanders (RO)
  sar: number;         // Special station auto-refresh
  fwire: number;       // Force wired connection
  ife: number;         // Notification events enable bits
  ife2: number;        // Extended notification enable bits
}

export interface NotificationEvents {
  programScheduled: boolean;      // bit 0
  sensor1StatusUpdate: boolean;   // bit 1
  flowSensorStatusUpdate: boolean;// bit 2
  weatherUpdate: boolean;         // bit 3
  reboot: boolean;                // bit 4
  stationFinish: boolean;         // bit 5
  sensor2StatusUpdate: boolean;   // bit 6
  rainDelayUpdate: boolean;       // bit 7
}

export interface ExtendedNotificationEvents {
  stationStart: boolean;          // bit 0
  flowAlert: boolean;             // bit 1
}

export class OptionsResultUtil {
    static parseIpAddress(ip: number[]): string {
        return ip.map(byte => byte.toString()).join(".");
    }
    
    static parseNotificationEvents(ife: number): NotificationEvents {
        return {
            programScheduled: Boolean(ife & 0x01),
            sensor1StatusUpdate: Boolean(ife & 0x02),
            flowSensorStatusUpdate: Boolean(ife & 0x04),
            weatherUpdate: Boolean(ife & 0x08),
            reboot: Boolean(ife & 0x10),
            stationFinish: Boolean(ife & 0x20),
            sensor2StatusUpdate: Boolean(ife & 0x40),
            rainDelayUpdate: Boolean(ife & 0x80),
        };
    }

    static parseExctendedNotificationEvents(ife2: number): ExtendedNotificationEvents {
        return {
            stationStart: Boolean(ife2 & 0x01),
            flowAlert: Boolean(ife2 & 0x02)
        };
    }
}