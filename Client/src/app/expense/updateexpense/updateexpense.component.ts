import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { expenseService } from '../expenseService/expenseService';
import { categoryService } from 'src/app/categories/categoryService';
import { accountService } from 'src/app/Account/Service/accountService';
import { ActivatedRoute, Router } from '@angular/router';
import { expense } from 'src/app/models/expense';

@Component({
  selector: 'app-updateexpense',
  templateUrl: './updateexpense.component.html',
  styleUrls: ['./updateexpense.component.css']
})
export class UpdateexpenseComponent implements OnInit {

  
  ExpenseAmount: any 
  Description : any
  Selectedcategory: any = false
  
  Selectedaccounts: any = false
  categories: Category[]
  accounts: any[]
  creditAccounts: any[]
  ExpenseAccountId: string
  
  constructor(private _categoryService: categoryService, private _accountService: accountService
    , private _expenseService : expenseService ,  private activateroute: ActivatedRoute,private route: Router) { }

  ngOnInit(): void {
    this._categoryService.getCategoryByUserIdAndCateoryType("Expense").subscribe(data => {
      this.categories = (data as any).items
      this.getIncomeProperties(this.activateroute.snapshot.paramMap.get('expenseId'))
    })

  }

  getIncomeProperties(expenseId: string){
    this._expenseService.getExpenseBasedOnExpenseId(expenseId).subscribe(data => {
      var expenseDetails = (data as any).item as expense 
      this.ExpenseAmount= expenseDetails[0].amount
      this.Description= expenseDetails[0].Description
    this.ExpenseAccountId = expenseDetails[0].accountId
      console.log('category id', expenseDetails[0].CategoryId)

     
      this.Selectedcategory = this.categories.find(x=> x.categoryId ==  expenseDetails[0].CategoryId)

      console.log(this.Selectedcategory)
      this._accountService.getAccountByUserIdAndAccountType().subscribe(data => {
        this.accounts = (data as any).items
        this.Selectedaccounts = this.accounts.find(x=> x.accountId == this.ExpenseAccountId )
      })
    })
  }


  updateExpense(updateForm){
    
  var updatedExpense ={
    amount : updateForm.value.ExpenseAmount,
    Description: updateForm.value.Description,
    CategoryId:updateForm.value.Selectedcategory, 
    accountId:updateForm.value.Selectedaccounts 
  }
    

    this._expenseService.updateExpenseOnBasicsOfExpenseId( this.activateroute.snapshot.paramMap.get('expenseId') , updatedExpense).subscribe(data => {
      this.route.navigate(['/expense/list'])
    })
  }


}
