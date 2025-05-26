export declare enum ReturnCode {
    Success = 1,
    Unauthorized = 2,
    Mismatch = 3,
    DataMissing = 16,
    OutOfRange = 17,
    DataFormatError = 18,
    RFCodeError = 19,
    PageNotFound = 32,
    NotPermitted = 48
}
export declare const ReturnCodeMessages: Record<ReturnCode, string>;
export interface CommandResultJson {
    result: number;
}
export declare class CommandResult {
    result: ReturnCode;
    constructor(result: ReturnCode);
    isSuccess(): boolean;
    get message(): string;
    static fromJson(json: CommandResultJson): CommandResult;
}
