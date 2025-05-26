export interface OptionsResult {
    fwv: number;
    fwm: number;
    tz: number;
    dhcp: number;
    ip1: number;
    ip2: number;
    ip3: number;
    ip4: number;
    gw1: number;
    gw2: number;
    gw3: number;
    gw4: number;
    dns1: number;
    dns2: number;
    dns3: number;
    dns4: number;
    subn1: number;
    subn2: number;
    subn3: number;
    subn4: number;
    ntp: number;
    ntp1: number;
    ntp2: number;
    ntp3: number;
    ntp4: number;
    hp0: number;
    hp1: number;
    hwv: number;
    hwt: number;
    ext: number;
    sdt: number;
    mas: number;
    mas2: number;
    mton: number;
    mton2: number;
    mtof: number;
    mtof2: number;
    sn1t: number;
    sn1o: number;
    sn1on: number;
    sn1of: number;
    sn2t: number;
    sn2o: number;
    sn2on: number;
    sn2of: number;
    wl: number;
    den: number;
    ipas: number;
    devid: number;
    con: number;
    lit: number;
    dim: number;
    bst: number;
    uwt: number;
    lg: number;
    fpr0: number;
    fpr1: number;
    re: number;
    dexp: number;
    mexp: number;
    sar: number;
    fwire: number;
    ife: number;
    ife2: number;
}
export interface NotificationEvents {
    programScheduled: boolean;
    sensor1StatusUpdate: boolean;
    flowSensorStatusUpdate: boolean;
    weatherUpdate: boolean;
    reboot: boolean;
    stationFinish: boolean;
    sensor2StatusUpdate: boolean;
    rainDelayUpdate: boolean;
}
export interface ExtendedNotificationEvents {
    stationStart: boolean;
    flowAlert: boolean;
}
export declare class OptionsResultUtil {
    static parseIpAddress(ip: number[]): string;
    static parseNotificationEvents(ife: number): NotificationEvents;
    static parseExctendedNotificationEvents(ife2: number): ExtendedNotificationEvents;
}
