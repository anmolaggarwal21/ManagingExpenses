import { Component, OnInit } from '@angular/core';
import { categoryService } from 'src/app/categories/categoryService';
import { accountService } from 'src/app/Account/Service/accountService';
import { incomeService } from '../IncomeService/IncomeService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-createincome',
  templateUrl: './createincome.component.html',
  styleUrls: ['./createincome.component.css']
})
export class CreateincomeComponent implements OnInit {
  IncomeAmount: any
  Description : any
  categories: any
  accounts: any[]
  creditAccounts: any[]

  constructor(private _categoryService: categoryService, private _accountService: accountService
    , private _incomeService : incomeService ,  private route: Router) { }

  ngOnInit(): void {
    this._categoryService.getCategoryByUserIdAndCateoryType("Income").subscribe(data => {
      this.categories = (data as any).items
    })
    this._accountService.getAccountByUserIdAndAccountType().subscribe(data => {
      this.accounts = (data as any).items
      
    })
    
  }
  
  saveIncome(incomeForm){
    console.log('category inside income is ', incomeForm.value.Category )
    var account = {
    amount: incomeForm.value.IncomeAmount,
    accountId: incomeForm.value.Account,
    Description: incomeForm.value.Description,
    CategoryId: incomeForm.value.Category
  }
  this._incomeService.addIncome(account).subscribe(data=>{
    this.route.navigate(['/income/list'])
  })
}
}
