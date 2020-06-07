export interface createAccountRequest{
    description: string,
    accountName: string,
    accountType: string
}

export interface updateAccountRequest extends createAccountRequest{}