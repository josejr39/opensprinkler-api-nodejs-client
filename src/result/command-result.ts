export enum ReturnCode {
  Success = 1,
  Unauthorized = 2,
  Mismatch = 3,
  DataMissing = 16,
  OutOfRange = 17,
  DataFormatError = 18,
  RFCodeError = 19,
  PageNotFound = 32,
  NotPermitted = 48,
}

export const ReturnCodeMessages: Record<ReturnCode, string> = {
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

export interface CommandResultJson {
    result: number;
}

export class CommandResult {
  constructor(public result: ReturnCode) {}

  isSuccess(): boolean {
    return this.result === ReturnCode.Success;
  }

  get message(): string {
    return ReturnCodeMessages[this.result] || "Unknown error";
  }

  static fromJson(json: CommandResultJson): CommandResult {
    return new CommandResult(json.result as ReturnCode);
  }

}
