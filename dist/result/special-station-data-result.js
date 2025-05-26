"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpecialStationType = void 0;
var SpecialStationType;
(function (SpecialStationType) {
    SpecialStationType[SpecialStationType["Standard"] = 0] = "Standard";
    SpecialStationType[SpecialStationType["RF"] = 1] = "RF";
    SpecialStationType[SpecialStationType["RemoteIP"] = 2] = "RemoteIP";
    SpecialStationType[SpecialStationType["GPIO"] = 3] = "GPIO";
    SpecialStationType[SpecialStationType["HTTP"] = 4] = "HTTP";
    SpecialStationType[SpecialStationType["HTTPS"] = 5] = "HTTPS";
    SpecialStationType[SpecialStationType["RemoteOTC"] = 6] = "RemoteOTC";
})(SpecialStationType || (exports.SpecialStationType = SpecialStationType = {}));
