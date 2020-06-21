import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { accountService } from '../Service/accountService';

@Component({
  selector: 'app-updateaccount',
  templateUrl: './updateaccount.component.html',
  styleUrls: ['./updateaccount.component.css']
})
export class UpdateaccountComponent implements OnInit {
  accountType: any;
  accountName : any;
  Description: any;
  constructor(private activateRoute: ActivatedRoute, private _accountService: accountService, private route: Router) { }

  ngOnInit(): void {
    this.getAccountOnBasicsOfAccountId(this.activateRoute.snapshot.paramMap.get('accountId'))
  }
  updateAccount(updateForm){
    var updateModel={
      accountType : updateForm.value.accountType,
      accountName : updateForm.value.accountName,
      description: updateForm.value.Description
    }
    this._accountService.updateAccountServiceByAccountId(this.activateRoute.snapshot.paramMap.get('accountId'), updateModel).subscribe(data => {
      this.route.navigate(['/account/list'])
    })
  }

  getAccountOnBasicsOfAccountId(accountId){
  this._accountService.getAccountServiceByAccountId(accountId).subscribe(data=> {
    var accounts = (data as any).items
    this.accountType =  accounts[0].accountType
    this.accountName = accounts[0].accountName
    this.Description = accounts[0].description
            
  })
  }
}
