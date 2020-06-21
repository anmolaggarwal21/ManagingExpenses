import { Component, OnInit } from '@angular/core';
import { account } from 'src/app/models/account';
import { accountService } from '../Service/accountService';
import { Router } from '@angular/router';
import { util } from 'src/app/util/util';


@Component({
  selector: 'app-listaccount',
  templateUrl: './listaccount.component.html',
  styleUrls: ['./listaccount.component.css']
})
export class ListaccountComponent implements OnInit {
  accounts: account[]
  displayedColumns: string[] = ['type', 'name', 'description','Update','Delete'];
  selectedAccountType = 'Debit'
  constructor(private _accountService: accountService, private Route: Router, private utilInstance: util) { }

  ngOnInit(): void {
    this.getAccountsInComponent()
   // this.utilInstance.link = "Account";
    
  }
  getAccountsInComponent(){
      
      this._accountService.getAccountByUserIdAndAccountType(this.selectedAccountType).subscribe(data => {
        console.log(data )
        this.accounts = (data as any).items 
      } )
    }

    selectvalueChange(value){
      this.selectedAccountType = value;
      console.log(value)
      this.getAccountsInComponent()
    }

    updateAccount(accountId){
      this.Route.navigate([`account/update/${accountId}`])
    }

    deleteAccount(accountId){
      this._accountService.deleteAccountServiceByAccountId(accountId).subscribe(data=> {
        this.getAccountsInComponent()
      })
    }
  
}
