import { Component, OnInit } from '@angular/core';
import { accountService } from '../Service/accountService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-createaccount',
  templateUrl: './createaccount.component.html',
  styleUrls: ['./createaccount.component.css']
})
export class CreateaccountComponent implements OnInit {
  accountType: any;
  accountName: any;
  Description: any;
  constructor(private _accountService : accountService, private route: Router) { }

  ngOnInit(): void {
  }

  saveAccount(accountForm){

    this._accountService.createaccount({
      
      accountType: accountForm.value.accountType,
      accountName: accountForm.value.accountName,
      description: accountForm.value.Description,
    }).subscribe(data => {
      this.route.navigate(['/account/list'])
      console.log(data)
    })
   
   
  }

}
