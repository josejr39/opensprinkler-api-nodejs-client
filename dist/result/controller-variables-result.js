"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeatherErrorCode = exports.RebootCause = void 0;
var RebootCause;
(function (RebootCause) {
    RebootCause[RebootCause["NoneOrUnknown"] = 0] = "NoneOrUnknown";
    RebootCause[RebootCause["FactoryReset"] = 1] = "FactoryReset";
    RebootCause[RebootCause["ButtonTriggered"] = 2] = "ButtonTriggered";
    RebootCause[RebootCause["ResetToAPMode"] = 3] = "ResetToAPMode";
    RebootCause[RebootCause["ApiOrTimerTriggered"] = 4] = "ApiOrTimerTriggered";
    RebootCause[RebootCause["ApiTriggeredReboot"] = 5] = "ApiTriggeredReboot";
    RebootCause[RebootCause["SwitchFromAPToClient"] = 6] = "SwitchFromAPToClient";
    RebootCause[RebootCause["FirmwareUpdate"] = 7] = "FirmwareUpdate";
    RebootCause[RebootCause["WeatherCallFailed"] = 8] = "WeatherCallFailed";
    RebootCause[RebootCause["NetworkFailed"] = 9] = "NetworkFailed";
    RebootCause[RebootCause["NtpSync"] = 10] = "NtpSync";
    RebootCause[RebootCause["PowerOn"] = 99] = "PowerOn";
})(RebootCause || (exports.RebootCause = RebootCause = {}));
var WeatherErrorCode;
(function (WeatherErrorCode) {
    WeatherErrorCode[WeatherErrorCode["Success"] = 0] = "Success";
    WeatherErrorCode[WeatherErrorCode["RequestNotReceived"] = -1] = "RequestNotReceived";
    WeatherErrorCode[WeatherErrorCode["CannotConnectToWeatherServer"] = -2] = "CannotConnectToWeatherServer";
    WeatherErrorCode[WeatherErrorCode["RequestTimeout"] = -3] = "RequestTimeout";
    WeatherErrorCode[WeatherErrorCode["ReceivedEmptyReturn"] = -4] = "ReceivedEmptyReturn";
})(WeatherErrorCode || (exports.WeatherErrorCode = WeatherErrorCode = {}));
