import { CommandResult } from "./result/command-result";
import { ControllerVariablesResult } from "./result/controller-variables-result";
import { OptionsResult } from "./result/options-result";
import { GetStationNamesAndAttributesResult } from "./result/station-names-and-attributes-result";
import { SpecialStationDataResult } from "./result/special-station-data-result";
import { StationStatusResult } from "./result/station-status-result";
import { ProgramDataResult } from "./result/program-data-result";
import { LogDataResult } from "./result/log-data-result";
export declare class OpenSprinklerClient {
    private apiEndpoint;
    constructor(endpoint: string);
    /**
     * Calls the /jc endpoint to get controller variables.
     * @param pw Password string (required)
     * @returns Promise resolving to ControllerVariablesResult
     */
    getControllerVariables(pw: string): Promise<ControllerVariablesResult>;
    /**
     * Calls the /cv endpoint with the provided parameters.
     * @param pw Password string (required)
     * @param params Optional parameters for controller variables update
     * @returns Promise resolving to CommandResult
     */
    setControllerVariables(pw: string, params: {
        rsn?: boolean;
        rbt?: boolean;
        en?: boolean;
        rd?: number;
        re?: number;
        ap?: boolean;
        update?: boolean;
    }): Promise<CommandResult>;
    /**
     * Calls the /jo endpoint to get device options.
     * @param pw Password string (required)
     * @returns Promise resolving to GetOptionsResult
     */
    getOptions(pw: string): Promise<OptionsResult>;
    /**
     * Calls the /sp endpoint to set a new password.
     * @param pw Current password (string, required)
     * @param npw New password (MD5 hash, required)
     * @param cpw Confirmation password (MD5 hash, required)
     * @returns Promise resolving to CommandResult
     */
    setPassword(pw: string, npw: string, cpw: string): Promise<CommandResult>;
    /**
     * Calls the /jn endpoint to get station names and attributes.
     * @param pw Password string (required)
     * @returns Promise resolving to GetStationNamesAndAttributesResult
     */
    getStationNamesAndAttributes(pw: string): Promise<GetStationNamesAndAttributesResult>;
    /**
     * Calls the /je endpoint to get special station data.
     * @param pw Password string (required)
     * @returns Promise resolving to SpecialStationDataResult
     */
    getSpecialStationData(pw: string): Promise<SpecialStationDataResult>;
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
    setStationNamesAndAttributesAdvanced(pw: string, options: {
        s?: Record<number, string>;
        m?: Record<number, number>;
        n?: Record<number, number>;
        i?: Record<number, number>;
        j?: Record<number, number>;
        k?: Record<number, number>;
        d?: Record<number, number>;
        p?: Record<number, number>;
        g?: Record<number, number>;
        sid?: number;
        st?: number;
        sd?: string;
    }): Promise<CommandResult>;
    /**
    * Calls the /js endpoint to get the station status.
    * @param pw Password string (required)
    * @returns Promise resolving to StationStatusResult
    */
    getStationStatus(pw: string): Promise<StationStatusResult>;
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
    cmanualStationRun(pw: string, params: {
        sid: number;
        en: 0 | 1;
        t?: number;
        ssta?: 0 | 1;
    }): Promise<CommandResult>;
    /**
     * Calls the /mp endpoint to manually start a program.
     * @param pw Password string (required)
     * @param params Object containing:
     *   - pid: Program index (number, required)
     *   - uwt: Use weather (0: do not use weather, 1: use weather, required)
     * @returns Promise resolving to CommandResult
     */
    manualStartProgram(pw: string, params: {
        pid: number;
        uwt: 0 | 1;
    }): Promise<CommandResult>;
    /**
     * Calls the /jp endpoint to get all program data.
     * @param pw Password string (required)
     * @returns Promise resolving to ProgramDataResult
     */
    getPrograms(pw: string): Promise<ProgramDataResult>;
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
    changeProgram(pw: string, params: {
        pid: number;
        en?: 0 | 1;
        uwt?: 0 | 1;
        name?: string;
        v?: [number, number, number, [number, number, number, number], number[]];
        from?: number;
        to?: number;
    }): Promise<CommandResult>;
    /**
     * Calls the /dp endpoint to delete program(s).
     * @param pw Password string (required)
     * @param pid Program index (-1 to delete all, 0..N-1 to delete a specific program)
     * @returns Promise resolving to CommandResult
     */
    deleteProgram(pw: string, pid: number): Promise<CommandResult>;
    /**
     * Calls the /up endpoint to move up / re-order a program.
     * @param pw Password string (required)
     * @param pid Program index (0..N-1, where N is the number of existing programs)
     * @returns Promise resolving to CommandResult
     */
    moveProgramUp(pw: string, pid: number): Promise<CommandResult>;
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
    startRunOnceProgram(pw: string, params: {
        t: number[];
        cnt?: number;
        int?: number;
        uwt?: 0 | 1;
    }): Promise<CommandResult>;
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
    getLogData(pw: string, params?: {
        start?: number;
        end?: number;
        hist?: number;
        type?: string;
    }): Promise<LogDataResult>;
    /**
    * Calls the /dl endpoint to delete log data.
    * @param pw Password string (required)
    * @param day The day to delete (number: epoch days, or string: "all" to delete all logs)
    * @returns Promise resolving to CommandResult
    */
    deleteLogData(pw: string, day: number | "all"): Promise<CommandResult>;
    /**
     * Calls the /cu endpoint to change the Javascript URL.
     * @param pw Password string (required)
     * @param jsp New Javascript path (string, required)
     * @returns Promise resolving to CommandResult
     */
    changeJavascriptUrl(pw: string, jsp: string): Promise<CommandResult>;
    /**
     * Calls the /ja endpoint to get the aggregated result of /jc, /jo, /jn, /js, /jp.
     * Returns an object with "settings", "options", "stations", "status", and "programs" fields.
     * @param pw Password string (required)
     * @returns Promise resolving to the aggregated result
     */
    getAllAggregated(pw: string): Promise<{
        settings: ControllerVariablesResult;
        options: OptionsResult;
        stations: GetStationNamesAndAttributesResult;
        status: StationStatusResult;
        programs: ProgramDataResult;
    }>;
    /**
    * Calls the /pq endpoint to pause or resume the station queue.
    * @param pw Password string (required)
    * @param params Object containing:
    *   - dur?: Duration to pause in seconds (number, optional)
    *   - repl?: Replace current pause with this duration in seconds (number, optional)
    * @returns Promise resolving to CommandResult
    */
    pauseQueue(pw: string, params?: {
        dur?: number;
        repl?: number;
    }): Promise<CommandResult>;
    /**
     * Calls the /db endpoint to get debug printout.
     * @returns Promise resolving to the debug printout (string or object, depending on firmware)
     */
    getDebugPrintout(): Promise<any>;
}
