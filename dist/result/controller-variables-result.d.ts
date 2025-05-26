export declare enum RebootCause {
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
    PowerOn = 99
}
export declare enum WeatherErrorCode {
    Success = 0,
    RequestNotReceived = -1,
    CannotConnectToWeatherServer = -2,
    RequestTimeout = -3,
    ReceivedEmptyReturn = -4
}
export interface ControllerVariablesResult {
    devt: number;
    nbrd: number;
    en: number;
    sn1: number;
    sn2?: number;
    rd: number;
    rdst: number;
    sunrise: number;
    sunset: number;
    eip: number;
    lwc: number;
    lswc: number;
    lupt: number;
    lrbtc: RebootCause;
    lrun: [number, number, number, number];
    RSSI?: number;
    mac: string;
    loc: string;
    jsp: string;
    wsp: string;
    wto: any;
    wtdata: any;
    wterr: WeatherErrorCode;
    ifkey: string;
    mqtt: any;
    curr?: number;
    sbits: number[];
    ps: [number, number, number, number][];
    flwrt: number;
    flcrt: number;
    pq: number;
    pt: number;
    nq: number;
    otc: any;
    otcs: number;
    dname: string;
    gpio: number[];
    email: any;
}
