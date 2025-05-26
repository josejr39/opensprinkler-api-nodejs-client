"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenSprinklerClient = void 0;
const axios_1 = __importDefault(require("axios"));
const command_result_1 = require("./result/command-result");
class OpenSprinklerClient {
    constructor(endpoint) {
        this.apiEndpoint = endpoint;
    }
    /**
     * Calls the /jc endpoint to get controller variables.
     * @param pw Password string (required)
     * @returns Promise resolving to ControllerVariablesResult
     */
    getControllerVariables(pw) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield axios_1.default.get(`${this.apiEndpoint}/jc`, {
                params: { pw }
            });
            return response.data;
        });
    }
    /**
     * Calls the /cv endpoint with the provided parameters.
     * @param pw Password string (required)
     * @param params Optional parameters for controller variables update
     * @returns Promise resolving to CommandResult
     */
    setControllerVariables(pw, params) {
        return __awaiter(this, void 0, void 0, function* () {
            // Prepare query parameters
            const queryParams = { pw };
            if (params.rsn)
                queryParams.rsn = 1;
            if (params.rbt)
                queryParams.rbt = 1;
            queryParams.en = params.en ? 1 : 0; // Convert boolean to 1 or 0
            if (typeof params.rd === "number")
                queryParams.rd = params.rd;
            if (typeof params.re === "number")
                queryParams.re = params.re;
            if (params.ap)
                queryParams.ap = 1;
            if (params.update)
                queryParams.update = 1;
            const response = yield axios_1.default.get(`${this.apiEndpoint}/cv`, {
                params: queryParams,
            });
            return command_result_1.CommandResult.fromJson(response.data);
        });
    }
    /**
     * Calls the /jo endpoint to get device options.
     * @param pw Password string (required)
     * @returns Promise resolving to GetOptionsResult
     */
    getOptions(pw) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield axios_1.default.get(`${this.apiEndpoint}/jo`, {
                params: { pw }
            });
            return response.data;
        });
    }
    /**
     * Calls the /sp endpoint to set a new password.
     * @param pw Current password (string, required)
     * @param npw New password (MD5 hash, required)
     * @param cpw Confirmation password (MD5 hash, required)
     * @returns Promise resolving to CommandResult
     */
    setPassword(pw, npw, cpw) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield axios_1.default.get(`${this.apiEndpoint}/sp`, {
                params: { pw, npw, cpw }
            });
            return command_result_1.CommandResult.fromJson(response.data);
        });
    }
    /**
     * Calls the /jn endpoint to get station names and attributes.
     * @param pw Password string (required)
     * @returns Promise resolving to GetStationNamesAndAttributesResult
     */
    getStationNamesAndAttributes(pw) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield axios_1.default.get(`${this.apiEndpoint}/jn`, {
                params: { pw }
            });
            return response.data;
        });
    }
    /**
     * Calls the /je endpoint to get special station data.
     * @param pw Password string (required)
     * @returns Promise resolving to SpecialStationDataResult
     */
    getSpecialStationData(pw) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield axios_1.default.get(`${this.apiEndpoint}/je`, {
                params: { pw }
            });
            return response.data;
        });
    }
    /**
    * Calls the /cs endpoint to change station names and attributes using structured parameters.
    * @param pw Password string (required)
    * @param options Object containing station name/attribute changes
    *   - s: Record<number, string> (station index to name)
    *   - m: Record<number, number> (board index to Master1 bit field)
    *   - n: Record<number, number> (board index to Master2 bit field)
    *   - i: Record<number, number> (board index to ignore_rain bit field)
    *   - j: Record<number, number> (board index to ignore_sn1 bit field)
    *   - k: Record<number, number> (board index to ignore_sn2 bit field)
    *   - d: Record<number, number> (board index to disable bit field)
    *   - p: Record<number, number> (board index to special bit field)
    *   - g: Record<number, number> (station index to group id)
    *   - sid: Special station index (number)
    *   - st: Special station type (number)
    *   - sd: Special station data (string)
    * @returns Promise resolving to CommandResult
    */
    setStationNamesAndAttributesAdvanced(pw, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryParams = { pw };
            if (options.s)
                Object.entries(options.s).forEach(([idx, val]) => queryParams[`s${idx}`] = val);
            if (options.m)
                Object.entries(options.m).forEach(([idx, val]) => queryParams[`m${idx}`] = val);
            if (options.n)
                Object.entries(options.n).forEach(([idx, val]) => queryParams[`n${idx}`] = val);
            if (options.i)
                Object.entries(options.i).forEach(([idx, val]) => queryParams[`i${idx}`] = val);
            if (options.j)
                Object.entries(options.j).forEach(([idx, val]) => queryParams[`j${idx}`] = val);
            if (options.k)
                Object.entries(options.k).forEach(([idx, val]) => queryParams[`k${idx}`] = val);
            if (options.d)
                Object.entries(options.d).forEach(([idx, val]) => queryParams[`d${idx}`] = val);
            if (options.p)
                Object.entries(options.p).forEach(([idx, val]) => queryParams[`p${idx}`] = val);
            if (options.g)
                Object.entries(options.g).forEach(([idx, val]) => queryParams[`g${idx}`] = val);
            if (typeof options.sid === "number")
                queryParams.sid = options.sid;
            if (typeof options.st === "number")
                queryParams.st = options.st;
            if (typeof options.sd === "string")
                queryParams.sd = options.sd;
            const response = yield axios_1.default.get(`${this.apiEndpoint}/cs`, {
                params: queryParams,
            });
            return command_result_1.CommandResult.fromJson(response.data);
        });
    }
    /**
    * Calls the /js endpoint to get the station status.
    * @param pw Password string (required)
    * @returns Promise resolving to StationStatusResult
    */
    getStationStatus(pw) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield axios_1.default.get(`${this.apiEndpoint}/js`, {
                params: { pw }
            });
            return response.data;
        });
    }
    /**
     * Calls the /cm endpoint to manually run a station (previously manual override) [.
     * @param pw Password string (required)
     * @param params Object containing:
     *   - sid: Station index (number, required)
     *   - en: Enable bit (1: open; 0: close, required)
     *   - t: Timer in seconds (required if en=1, 0-64800)
     *   - ssta: Shift remaining stations in the same group (0 or 1, only applicable if en=0)
     * @returns Promise resolving to CommandResult
     */
    cmanualStationRun(pw, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryParams = {
                pw,
                sid: params.sid,
                en: params.en
            };
            if (params.en === 1 && typeof params.t === "number") {
                queryParams.t = params.t;
            }
            if (params.en === 0 && typeof params.ssta === "number") {
                queryParams.ssta = params.ssta;
            }
            const response = yield axios_1.default.get(`${this.apiEndpoint}/cm`, {
                params: queryParams,
            });
            return command_result_1.CommandResult.fromJson(response.data);
        });
    }
    /**
     * Calls the /mp endpoint to manually start a program.
     * @param pw Password string (required)
     * @param params Object containing:
     *   - pid: Program index (number, required)
     *   - uwt: Use weather (0: do not use weather, 1: use weather, required)
     * @returns Promise resolving to CommandResult
     */
    manualStartProgram(pw, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryParams = {
                pw,
                pid: params.pid,
                uwt: params.uwt
            };
            const response = yield axios_1.default.get(`${this.apiEndpoint}/mp`, {
                params: queryParams,
            });
            return command_result_1.CommandResult.fromJson(response.data);
        });
    }
    /**
     * Calls the /jp endpoint to get all program data.
     * @param pw Password string (required)
     * @returns Promise resolving to ProgramDataResult
     */
    getPrograms(pw) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield axios_1.default.get(`${this.apiEndpoint}/jp`, {
                params: { pw }
            });
            return response.data;
        });
    }
    /**
     * Calls the /cp endpoint to change program data (add or modify a program).
     * @param pw Password string (required)
     * @param params Object containing:
     *   - pid: Program index (-1 to add new, 0..N-1 to modify)
     *   - en?: Enable/disable this program (if present, all other params are ignored)
     *   - uwt?: Set Use Weather flag (if present, all other params are ignored)
     *   - name?: Program name (url encoded, without quotes)
     *   - v?: Program data structure (see ProgramData type, except for name, from, to)
     *   - from?: Date range start (number, encoded as described)
     *   - to?: Date range end (number, encoded as described)
     * @returns Promise resolving to CommandResult
     */
    changeProgram(pw, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryParams = {
                pw,
                pid: params.pid
            };
            // If en or uwt is present, only send those (per API spec)
            if (typeof params.en !== "undefined") {
                queryParams.en = params.en;
            }
            else if (typeof params.uwt !== "undefined") {
                queryParams.uwt = params.uwt;
            }
            else {
                if (typeof params.name === "string")
                    queryParams.name = params.name;
                if (params.v)
                    queryParams.v = JSON.stringify(params.v);
                if (typeof params.from === "number")
                    queryParams.from = params.from;
                if (typeof params.to === "number")
                    queryParams.to = params.to;
            }
            const response = yield axios_1.default.get(`${this.apiEndpoint}/cp`, {
                params: queryParams,
            });
            return command_result_1.CommandResult.fromJson(response.data);
        });
    }
    /**
     * Calls the /dp endpoint to delete program(s).
     * @param pw Password string (required)
     * @param pid Program index (-1 to delete all, 0..N-1 to delete a specific program)
     * @returns Promise resolving to CommandResult
     */
    deleteProgram(pw, pid) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield axios_1.default.get(`${this.apiEndpoint}/dp`, {
                params: { pw, pid }
            });
            return command_result_1.CommandResult.fromJson(response.data);
        });
    }
    /**
     * Calls the /up endpoint to move up / re-order a program.
     * @param pw Password string (required)
     * @param pid Program index (0..N-1, where N is the number of existing programs)
     * @returns Promise resolving to CommandResult
     */
    moveProgramUp(pw, pid) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield axios_1.default.get(`${this.apiEndpoint}/up`, {
                params: { pw, pid }
            });
            return command_result_1.CommandResult.fromJson(response.data);
        });
    }
    /**
     * Calls the /cr endpoint to start a run-once program.
     * @param pw Password string (required)
     * @param params Object containing:
     *   - t: Array of durations for each station (number[])
     *   - cnt?: Repeat count (number, optional)
     *   - int?: Repeat interval in minutes (number, optional)
     *   - uwt?: Use weather (0 or 1, optional)
     * @returns Promise resolving to CommandResult
     */
    startRunOnceProgram(pw, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryParams = {
                pw,
                t: JSON.stringify(params.t)
            };
            if (typeof params.cnt === "number")
                queryParams.cnt = params.cnt;
            if (typeof params.int === "number")
                queryParams.int = params.int;
            if (typeof params.uwt === "number")
                queryParams.uwt = params.uwt;
            const response = yield axios_1.default.get(`${this.apiEndpoint}/cr`, {
                params: queryParams,
            });
            return command_result_1.CommandResult.fromJson(response.data);
        });
    }
    /**
     * Calls the /jl endpoint to get log data.
     * You can specify either start/end (epoch times) or hist (number of days back), and optionally type.
     * @param pw Password string (required)
     * @param params Object containing:
     *   - start?: Start time (epoch, optional)
     *   - end?: End time (epoch, optional)
     *   - hist?: Number of days back (optional)
     *   - type?: Log type filter (optional, e.g. "s1", "s2", "rd", "fl", "wl")
     * @returns Promise resolving to LogDataResult
     */
    getLogData(pw_1) {
        return __awaiter(this, arguments, void 0, function* (pw, params = {}) {
            const queryParams = { pw };
            if (typeof params.start === "number")
                queryParams.start = params.start;
            if (typeof params.end === "number")
                queryParams.end = params.end;
            if (typeof params.hist === "number")
                queryParams.hist = params.hist;
            if (typeof params.type === "string")
                queryParams.type = params.type;
            const response = yield axios_1.default.get(`${this.apiEndpoint}/jl`, {
                params: queryParams,
            });
            return response.data;
        });
    }
    /**
    * Calls the /dl endpoint to delete log data.
    * @param pw Password string (required)
    * @param day The day to delete (number: epoch days, or string: "all" to delete all logs)
    * @returns Promise resolving to CommandResult
    */
    deleteLogData(pw, day) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield axios_1.default.get(`${this.apiEndpoint}/dl`, {
                params: { pw, day }
            });
            return command_result_1.CommandResult.fromJson(response.data);
        });
    }
    /**
     * Calls the /cu endpoint to change the Javascript URL.
     * @param pw Password string (required)
     * @param jsp New Javascript path (string, required)
     * @returns Promise resolving to CommandResult
     */
    changeJavascriptUrl(pw, jsp) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield axios_1.default.get(`${this.apiEndpoint}/cu`, {
                params: { pw, jsp }
            });
            return command_result_1.CommandResult.fromJson(response.data);
        });
    }
    /**
     * Calls the /ja endpoint to get the aggregated result of /jc, /jo, /jn, /js, /jp.
     * Returns an object with "settings", "options", "stations", "status", and "programs" fields.
     * @param pw Password string (required)
     * @returns Promise resolving to the aggregated result
     */
    getAllAggregated(pw) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield axios_1.default.get(`${this.apiEndpoint}/ja`, {
                params: { pw }
            });
            return response.data;
        });
    }
    /**
    * Calls the /pq endpoint to pause or resume the station queue.
    * @param pw Password string (required)
    * @param params Object containing:
    *   - dur?: Duration to pause in seconds (number, optional)
    *   - repl?: Replace current pause with this duration in seconds (number, optional)
    * @returns Promise resolving to CommandResult
    */
    pauseQueue(pw_1) {
        return __awaiter(this, arguments, void 0, function* (pw, params = {}) {
            const queryParams = { pw };
            if (typeof params.repl === "number") {
                queryParams.repl = params.repl;
            }
            else if (typeof params.dur === "number") {
                queryParams.dur = params.dur;
            }
            const response = yield axios_1.default.get(`${this.apiEndpoint}/pq`, {
                params: queryParams,
            });
            return command_result_1.CommandResult.fromJson(response.data);
        });
    }
    /**
     * Calls the /db endpoint to get debug printout.
     * @returns Promise resolving to the debug printout (string or object, depending on firmware)
     */
    getDebugPrintout() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield axios_1.default.get(`${this.apiEndpoint}/db`);
            return response.data;
        });
    }
}
exports.OpenSprinklerClient = OpenSprinklerClient;
