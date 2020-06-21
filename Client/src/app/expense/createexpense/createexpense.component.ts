import { Component, OnInit } from '@angular/core';
import { categoryService } from 'src/app/categories/categoryService';
import { accountService } from 'src/app/Account/Service/accountService';
import { expenseService } from '../expenseService/expenseService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-createexpense',
  templateUrl: './createexpense.component.html',
  styleUrls: ['./createexpense.component.css']
})
export class CreateexpenseComponent implements OnInit {
  ExpenseAmount: any
  Description : any
  categories: any
  accounts: any[]
  creditAccounts: any[]

  constructor(private _categoryService: categoryService, private _accountService: accountService 
    , private _expenseService : expenseService ,  private route: Router ) { }

  ngOnInit(): void {
    this._categoryService.getCategoryByUserIdAndCateoryType("Expense").subscribe(data => {
      this.categories = (data as any).items
    })
    this._accountService.getAccountByUserIdAndAccountType().subscribe(data => {
      this.accounts = (data as any).items
      
    })
    
  }

  saveExpense(expenseForm){
    console.log('value for category is ', expenseForm.value.Category)
    var expense = {
    amount: expenseForm.value.ExpenseAmount,
    accountId: expenseForm.value.Account,
    Description: expenseForm.value.Description,
    CategoryId: expenseForm.value.Category
  }
  this._expenseService.addExpense(expense).subscribe(data=>{
    this.route.navigate(['/expense/list'])
  })
  }

}
