import axios from "axios";
import { CommandResult, CommandResultJson } from "./result/command-result";
import { ControllerVariablesResult } from "./result/controller-variables-result";
import { OptionsResult } from "./result/options-result";
import { GetStationNamesAndAttributesResult } from "./result/station-names-and-attributes-result";
import { SpecialStationDataResult } from "./result/special-station-data-result";
import { StationStatusResult } from "./result/station-status-result";
import { ProgramDataResult } from "./result/program-data-result";
import { LogDataResult } from "./result/log-data-result";


export class OpenSprinklerClient {
    private apiEndpoint: string;

    constructor(endpoint: string ) {
        this.apiEndpoint = endpoint;
    }

    /**
     * Calls the /jc endpoint to get controller variables.
     * @param pw Password string (required)
     * @returns Promise resolving to ControllerVariablesResult
     */
    async getControllerVariables(pw: string): Promise<ControllerVariablesResult> {
        const response = await axios.get(`${this.apiEndpoint}/jc`, {
            params: { pw }
        });
        return response.data as ControllerVariablesResult;
    }

    /**
     * Calls the /cv endpoint with the provided parameters.
     * @param pw Password string (required)
     * @param params Optional parameters for controller variables update
     * @returns Promise resolving to CommandResult
     */
    async setControllerVariables(
        pw: string,
        params: {
            rsn?: boolean;
            rbt?: boolean;
            en?: boolean;
            rd?: number;
            re?: number;
            ap?: boolean;
            update?: boolean;
        }
    ): Promise<CommandResult> {
        // Prepare query parameters
        const queryParams: Record<string, any> = { pw };

        if (params.rsn) queryParams.rsn = 1;
        if (params.rbt) queryParams.rbt = 1;
        queryParams.en = params.en ? 1 : 0; // Convert boolean to 1 or 0
        if (typeof params.rd === "number") queryParams.rd = params.rd;
        if (typeof params.re === "number") queryParams.re = params.re;
        if (params.ap) queryParams.ap = 1;
        if (params.update) queryParams.update = 1;

        const response = await axios.get(`${this.apiEndpoint}/cv`, {
            params: queryParams,
        });

        return CommandResult.fromJson(response.data as CommandResultJson);
    }

    /**
     * Calls the /jo endpoint to get device options.
     * @param pw Password string (required)
     * @returns Promise resolving to GetOptionsResult
     */
    async getOptions(pw: string): Promise<OptionsResult> {
        const response = await axios.get(`${this.apiEndpoint}/jo`, {
            params: { pw }
        });
        return response.data as OptionsResult;
    }

    /**
     * Calls the /sp endpoint to set a new password.
     * @param pw Current password (string, required)
     * @param npw New password (MD5 hash, required)
     * @param cpw Confirmation password (MD5 hash, required)
     * @returns Promise resolving to CommandResult
     */
    async setPassword(pw: string, npw: string, cpw: string): Promise<CommandResult> {
        const response = await axios.get(`${this.apiEndpoint}/sp`, {
            params: { pw, npw, cpw }
        });
        return CommandResult.fromJson(response.data as CommandResultJson);
    }

    /**
     * Calls the /jn endpoint to get station names and attributes.
     * @param pw Password string (required)
     * @returns Promise resolving to GetStationNamesAndAttributesResult
     */
    async getStationNamesAndAttributes(pw: string): Promise<GetStationNamesAndAttributesResult> {
        const response = await axios.get(`${this.apiEndpoint}/jn`, {
            params: { pw }
        });
        return response.data as GetStationNamesAndAttributesResult;
    }

    /**
     * Calls the /je endpoint to get special station data.
     * @param pw Password string (required)
     * @returns Promise resolving to SpecialStationDataResult
     */
    async getSpecialStationData(pw: string): Promise<SpecialStationDataResult> {
        const response = await axios.get(`${this.apiEndpoint}/je`, {
            params: { pw }
        });
        return response.data as SpecialStationDataResult;
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
    async setStationNamesAndAttributesAdvanced(
        pw: string,
        options: {
            s?: Record<number, string>,
            m?: Record<number, number>,
            n?: Record<number, number>,
            i?: Record<number, number>,
            j?: Record<number, number>,
            k?: Record<number, number>,
            d?: Record<number, number>,
            p?: Record<number, number>,
            g?: Record<number, number>,
            sid?: number,
            st?: number,
            sd?: string
        }
    ): Promise<CommandResult> {
        const queryParams: Record<string, string | number> = { pw };

        if (options.s) Object.entries(options.s).forEach(([idx, val]) => queryParams[`s${idx}`] = val);
        if (options.m) Object.entries(options.m).forEach(([idx, val]) => queryParams[`m${idx}`] = val);
        if (options.n) Object.entries(options.n).forEach(([idx, val]) => queryParams[`n${idx}`] = val);
        if (options.i) Object.entries(options.i).forEach(([idx, val]) => queryParams[`i${idx}`] = val);
        if (options.j) Object.entries(options.j).forEach(([idx, val]) => queryParams[`j${idx}`] = val);
        if (options.k) Object.entries(options.k).forEach(([idx, val]) => queryParams[`k${idx}`] = val);
        if (options.d) Object.entries(options.d).forEach(([idx, val]) => queryParams[`d${idx}`] = val);
        if (options.p) Object.entries(options.p).forEach(([idx, val]) => queryParams[`p${idx}`] = val);
        if (options.g) Object.entries(options.g).forEach(([idx, val]) => queryParams[`g${idx}`] = val);
        if (typeof options.sid === "number") queryParams.sid = options.sid;
        if (typeof options.st === "number") queryParams.st = options.st;
        if (typeof options.sd === "string") queryParams.sd = options.sd;

        const response = await axios.get(`${this.apiEndpoint}/cs`, {
            params: queryParams,
        });

        return CommandResult.fromJson(response.data as CommandResultJson);
    }

     /**
     * Calls the /js endpoint to get the station status.
     * @param pw Password string (required)
     * @returns Promise resolving to StationStatusResult
     */
    async getStationStatus(pw: string): Promise<StationStatusResult> {
        const response = await axios.get(`${this.apiEndpoint}/js`, {
            params: { pw }
        });
        return response.data as StationStatusResult;
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
    async cmanualStationRun(
        pw: string,
        params: {
            sid: number;
            en: 0 | 1;
            t?: number;
            ssta?: 0 | 1;
        }
    ): Promise<CommandResult> {
        const queryParams: Record<string, number | string> = {
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

        const response = await axios.get(`${this.apiEndpoint}/cm`, {
            params: queryParams,
        });

        return CommandResult.fromJson(response.data as CommandResultJson);
    }

    /**
     * Calls the /mp endpoint to manually start a program.
     * @param pw Password string (required)
     * @param params Object containing:
     *   - pid: Program index (number, required)
     *   - uwt: Use weather (0: do not use weather, 1: use weather, required)
     * @returns Promise resolving to CommandResult
     */
    async manualStartProgram(
        pw: string,
        params: {
            pid: number;
            uwt: 0 | 1;
        }
    ): Promise<CommandResult> {
        const queryParams: Record<string, number | string> = {
            pw,
            pid: params.pid,
            uwt: params.uwt
        };

        const response = await axios.get(`${this.apiEndpoint}/mp`, {
            params: queryParams,
        });

        return CommandResult.fromJson(response.data as CommandResultJson);
    }  

    /**
     * Calls the /jp endpoint to get all program data.
     * @param pw Password string (required)
     * @returns Promise resolving to ProgramDataResult
     */
    async getPrograms(pw: string): Promise<ProgramDataResult> {
        const response = await axios.get(`${this.apiEndpoint}/jp`, {
            params: { pw }
        });
        return response.data as ProgramDataResult;
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
    async changeProgram(
        pw: string,
        params: {
            pid: number;
            en?: 0 | 1;
            uwt?: 0 | 1;
            name?: string;
            v?: [number, number, number, [number, number, number, number], number[]];
            from?: number;
            to?: number;
        }
    ): Promise<CommandResult> {
        const queryParams: Record<string, string | number> = {
            pw,
            pid: params.pid
        };

        // If en or uwt is present, only send those (per API spec)
        if (typeof params.en !== "undefined") {
            queryParams.en = params.en;
        } else if (typeof params.uwt !== "undefined") {
            queryParams.uwt = params.uwt;
        } else {
            if (typeof params.name === "string") queryParams.name = params.name;
            if (params.v) queryParams.v = JSON.stringify(params.v);
            if (typeof params.from === "number") queryParams.from = params.from;
            if (typeof params.to === "number") queryParams.to = params.to;
        }

        const response = await axios.get(`${this.apiEndpoint}/cp`, {
            params: queryParams,
        });

        return CommandResult.fromJson(response.data as CommandResultJson);
    }

    /**
     * Calls the /dp endpoint to delete program(s).
     * @param pw Password string (required)
     * @param pid Program index (-1 to delete all, 0..N-1 to delete a specific program)
     * @returns Promise resolving to CommandResult
     */
    async deleteProgram(pw: string, pid: number): Promise<CommandResult> {
        const response = await axios.get(`${this.apiEndpoint}/dp`, {
            params: { pw, pid }
        });
        return CommandResult.fromJson(response.data as CommandResultJson);
    }

    /**
     * Calls the /up endpoint to move up / re-order a program.
     * @param pw Password string (required)
     * @param pid Program index (0..N-1, where N is the number of existing programs)
     * @returns Promise resolving to CommandResult
     */
    async moveProgramUp(pw: string, pid: number): Promise<CommandResult> {
        const response = await axios.get(`${this.apiEndpoint}/up`, {
            params: { pw, pid }
        });
        return CommandResult.fromJson(response.data as CommandResultJson);
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
    async startRunOnceProgram(
        pw: string,
        params: {
            t: number[];
            cnt?: number;
            int?: number;
            uwt?: 0 | 1;
        }
    ): Promise<CommandResult> {
        const queryParams: Record<string, string | number> = {
            pw,
            t: JSON.stringify(params.t)
        };
        if (typeof params.cnt === "number") queryParams.cnt = params.cnt;
        if (typeof params.int === "number") queryParams.int = params.int;
        if (typeof params.uwt === "number") queryParams.uwt = params.uwt;

        const response = await axios.get(`${this.apiEndpoint}/cr`, {
            params: queryParams,
        });

        return CommandResult.fromJson(response.data as CommandResultJson);
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
    async getLogData(
        pw: string,
        params: {
            start?: number;
            end?: number;
            hist?: number;
            type?: string;
        } = {}
    ): Promise<LogDataResult> {
        const queryParams: Record<string, string | number> = { pw };
        if (typeof params.start === "number") queryParams.start = params.start;
        if (typeof params.end === "number") queryParams.end = params.end;
        if (typeof params.hist === "number") queryParams.hist = params.hist;
        if (typeof params.type === "string") queryParams.type = params.type;

        const response = await axios.get(`${this.apiEndpoint}/jl`, {
            params: queryParams,
        });

        return response.data as LogDataResult;
    }

     /**
     * Calls the /dl endpoint to delete log data.
     * @param pw Password string (required)
     * @param day The day to delete (number: epoch days, or string: "all" to delete all logs)
     * @returns Promise resolving to CommandResult
     */
    async deleteLogData(pw: string, day: number | "all"): Promise<CommandResult> {
        const response = await axios.get(`${this.apiEndpoint}/dl`, {
            params: { pw, day }
        });
        return CommandResult.fromJson(response.data as CommandResultJson);
    }

    /**
     * Calls the /cu endpoint to change the Javascript URL.
     * @param pw Password string (required)
     * @param jsp New Javascript path (string, required)
     * @returns Promise resolving to CommandResult
     */
    async changeJavascriptUrl(pw: string, jsp: string): Promise<CommandResult> {
        const response = await axios.get(`${this.apiEndpoint}/cu`, {
            params: { pw, jsp }
        });
        return CommandResult.fromJson(response.data as CommandResultJson);
    }

    /**
     * Calls the /ja endpoint to get the aggregated result of /jc, /jo, /jn, /js, /jp.
     * Returns an object with "settings", "options", "stations", "status", and "programs" fields.
     * @param pw Password string (required)
     * @returns Promise resolving to the aggregated result
     */
    async getAllAggregated(pw: string): Promise<{
        settings: ControllerVariablesResult,
        options: OptionsResult,
        stations: GetStationNamesAndAttributesResult,
        status: StationStatusResult,
        programs: ProgramDataResult
    }> {
        const response = await axios.get(`${this.apiEndpoint}/ja`, {
            params: { pw }
        });
        return response.data as {
            settings: ControllerVariablesResult,
            options: OptionsResult,
            stations: GetStationNamesAndAttributesResult,
            status: StationStatusResult,
            programs: ProgramDataResult
        };
    }

     /**
     * Calls the /pq endpoint to pause or resume the station queue.
     * @param pw Password string (required)
     * @param params Object containing:
     *   - dur?: Duration to pause in seconds (number, optional)
     *   - repl?: Replace current pause with this duration in seconds (number, optional)
     * @returns Promise resolving to CommandResult
     */
    async pauseQueue(
        pw: string,
        params: {
            dur?: number;
            repl?: number;
        } = {}
    ): Promise<CommandResult> {
        const queryParams: Record<string, string | number> = { pw };
        if (typeof params.repl === "number") {
            queryParams.repl = params.repl;
        } else if (typeof params.dur === "number") {
            queryParams.dur = params.dur;
        }

        const response = await axios.get(`${this.apiEndpoint}/pq`, {
            params: queryParams,
        });

        return CommandResult.fromJson(response.data as CommandResultJson);
    }   

    /**
     * Calls the /db endpoint to get debug printout.
     * @returns Promise resolving to the debug printout (string or object, depending on firmware)
     */
    async getDebugPrintout(): Promise<any> {
        const response = await axios.get(`${this.apiEndpoint}/db`);
        return response.data;
    }
}