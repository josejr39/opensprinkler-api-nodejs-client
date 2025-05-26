"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandResult = exports.ReturnCodeMessages = exports.ReturnCode = void 0;
var ReturnCode;
(function (ReturnCode) {
    ReturnCode[ReturnCode["Success"] = 1] = "Success";
    ReturnCode[ReturnCode["Unauthorized"] = 2] = "Unauthorized";
    ReturnCode[ReturnCode["Mismatch"] = 3] = "Mismatch";
    ReturnCode[ReturnCode["DataMissing"] = 16] = "DataMissing";
    ReturnCode[ReturnCode["OutOfRange"] = 17] = "OutOfRange";
    ReturnCode[ReturnCode["DataFormatError"] = 18] = "DataFormatError";
    ReturnCode[ReturnCode["RFCodeError"] = 19] = "RFCodeError";
    ReturnCode[ReturnCode["PageNotFound"] = 32] = "PageNotFound";
    ReturnCode[ReturnCode["NotPermitted"] = 48] = "NotPermitted";
})(ReturnCode || (exports.ReturnCode = ReturnCode = {}));
exports.ReturnCodeMessages = {
    [ReturnCode.Success]: "Success",
    [ReturnCode.Unauthorized]: "Unauthorized (missing password or password is incorrect)",
    [ReturnCode.Mismatch]: "Mismatch (new password and confirmation password do not match)",
    [ReturnCode.DataMissing]: "Data Missing (missing required parameters)",
    [ReturnCode.OutOfRange]: "Out of Range (value exceeds the acceptable range)",
    [ReturnCode.DataFormatError]: "Data Format Error (provided data does not match required format)",
    [ReturnCode.RFCodeError]: "RF code error (RF code does not match required format)",
    [ReturnCode.PageNotFound]: "Page Not Found (page not found or requested file missing)",
    [ReturnCode.NotPermitted]: "Not Permitted (cannot operate on the requested station)",
};
class CommandResult {
    constructor(result) {
        this.result = result;
    }
    isSuccess() {
        return this.result === ReturnCode.Success;
    }
    get message() {
        return exports.ReturnCodeMessages[this.result] || "Unknown error";
    }
    static fromJson(json) {
        return new CommandResult(json.result);
    }
}
exports.CommandResult = CommandResult;
