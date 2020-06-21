import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { localStorageValues } from 'src/app/util/LocalStorageValue';
import { urlForServer } from '../../util/config';

@Injectable()
export class accountService {
   wholeUrl = urlForServer.wholeUrl;
  constructor(private http: HttpClient) { }

  createaccount(createAccountModel){
      return this.http.post(`${this.wholeUrl}/account`,createAccountModel)
  }

  // getAccountService(selectedAccountType){
  //     return this.http.get(`https://slcwobihdb.execute-api.us-east-2.amazonaws.com/dev/accountByType/${selectedAccountType}`)
  // }

  getAccountByUserIdAndAccountType(selectedAccountType? : string){
    var userId = localStorage.getItem(localStorageValues.userId)
   // return this.http.get(`https://slcwobihdb.execute-api.us-east-2.amazonaws.com/dev/accountByUserId`)
    var data;
    if(selectedAccountType && selectedAccountType != ''){
      data = { accountType: selectedAccountType }
     
      return this.http.get(`${this.wholeUrl}/accountByUserId`, {params: data})
  }
    else{
     
      return this.http.get(`${this.wholeUrl}/accountByUserId`)
    }
  }
  getAccountServiceByAccountId(accountId){
    return this.http.get(`${this.wholeUrl}/accountById/${accountId}`)
  }

  updateAccountServiceByAccountId(accountId, updateAccountBody){
    return this.http.put(`${this.wholeUrl}/account/${accountId}`, updateAccountBody)
  }

  deleteAccountServiceByAccountId(accountId){
    return this.http.delete(`${this.wholeUrl}/account/${accountId}`)
  }
}