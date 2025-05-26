"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptionsResultUtil = void 0;
class OptionsResultUtil {
    static parseIpAddress(ip) {
        return ip.map(byte => byte.toString()).join(".");
    }
    static parseNotificationEvents(ife) {
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
    static parseExctendedNotificationEvents(ife2) {
        return {
            stationStart: Boolean(ife2 & 0x01),
            flowAlert: Boolean(ife2 & 0x02)
        };
    }
}
exports.OptionsResultUtil = OptionsResultUtil;
