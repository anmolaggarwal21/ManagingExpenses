import {accountAccess} from '../dataLayer/accountAccess'
import { createAccountRequest, updateAccountRequest } from '../request/createAccountRequest'

import * as uuid from 'uuid'
import { Account } from '../models/Account'

var accountService = new accountAccess()

export async function getAccountByIdService(accountId: string){
    return await accountService.getAccountAccessById(accountId)
}

// export async function getAccountByTypeService(accountType: string){
//     return await accountService.getAccountAccessByType(accountType)
// }

export async function getAccountByUserIdService(userId: string, accountType?: string){
   
    if(accountType && accountType != ''){
        console.log('inside if')
        return await accountService.getAccountAccessByUserId(userId, accountType)
    }
    else{
        console.log('inside else')
        return await accountService.getAccountAccessByUserId(userId)
    }
    
}

export async function deleteAccountByIdService(accountId){
    return await accountService.deleteAccountAccessById(accountId) 
    
}

export async function getAllAccountService(){
    return await accountService.getAllAccountAccess() 
    
}

export async function createAccountService(createAccount: createAccountRequest, userId: string){

   var account: Account ={
        accountId: uuid.v4(),
        accountName: createAccount.accountName,
        accountType: createAccount.accountType,
        description: createAccount.description,
        accountUserId: userId
    }

    return await accountService.createAccountAccess(account)
}

export async function updateAccountService(accountId: string, updateAccount: updateAccountRequest){
    return await  accountService.updateAccountAccessById(accountId, updateAccount)
}

