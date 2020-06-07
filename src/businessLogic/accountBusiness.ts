import {accountAccess} from '../dataLayer/accountAccess'
import { createAccountRequest, updateAccountRequest } from '../request/createAccountRequest'

import * as uuid from 'uuid'
import { Account } from '../models/Account'

var accountService = new accountAccess()

export async function getAccountByIdService(accountId: string){
    return await accountService.getAccountAccessById(accountId)
}

export async function getAccountByTypeService(accountType: string){
    return await accountService.getAccountAccessByType(accountType)
}

export async function deleteAccountByIdService(accountId){
    return await accountService.deleteAccountAccessById(accountId)
}

export async function createAccountService(createAccount: createAccountRequest){

   var account: Account ={
        accountId: uuid.v4(),
        accountName: createAccount.accountName,
        accountType: createAccount.accountType,
        description: createAccount.description
    }

    return await accountService.createAccountAccess(account)
}

export async function updateAccountService(accountId: string, updateAccount: updateAccountRequest){
    return await  accountService.updateAccountAccessById(accountId, updateAccount)
}

