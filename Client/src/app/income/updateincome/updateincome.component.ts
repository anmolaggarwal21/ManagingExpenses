import { Component, OnInit } from '@angular/core';
import { categoryService } from 'src/app/categories/categoryService';
import { accountService } from 'src/app/Account/Service/accountService';
import { incomeService } from '../IncomeService/IncomeService';
import { Router } from '@angular/router';
import { income } from 'src/app/models/income';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-updateincome',
  templateUrl: './updateincome.component.html',
  styleUrls: ['./updateincome.component.css']
})
export class UpdateincomeComponent implements OnInit {

  
  IncomeAmount: any = 500
  Description : any
  Selectedcategory: any = false
  
  Selectedaccounts: any = false
  categories: Category[]
  accounts: any[]
  creditAccounts: any[]
  IncomeAccountId: string


  constructor(private _categoryService: categoryService, private _accountService: accountService
    , private _incomeService : incomeService ,  private activateroute: ActivatedRoute,private route: Router) { }

  ngOnInit(): void {
    
    
    this._categoryService.getCategoryByUserIdAndCateoryType("Income").subscribe(data => {
      this.categories = (data as any).items
      this.getIncomeProperties(this.activateroute.snapshot.paramMap.get('incomeId'))
    })
    
    
  }

  getIncomeProperties(incomeId: string){
    this._incomeService.getIncomeOnBasicsOfIncomeId(incomeId).subscribe(data => {
      var incomeDetails = (data as any).item as income 
      this.IncomeAmount= incomeDetails[0].amount
      this.Description= incomeDetails[0].Description
    this.IncomeAccountId = incomeDetails[0].accountId
      console.log('category id', incomeDetails[0].CategoryId)

     
      this.Selectedcategory = this.categories.find(x=> x.categoryId ==  incomeDetails[0].CategoryId)

      console.log(this.Selectedcategory)
      this._accountService.getAccountByUserIdAndAccountType().subscribe(data => {
        this.accounts = (data as any).items
        this.Selectedaccounts = this.accounts.find(x=> x.accountId == this.IncomeAccountId )
      })
    })
  }



  updateIncome(updateForm){
    
  var updatedIncome ={
    amount : updateForm.value.IncomeAmount,
    Description: updateForm.value.Description,
    CategoryId:updateForm.value.Selectedcategory, 
    accountId:updateForm.value.Selectedaccounts 
  }
    

    this._incomeService.updateIncomeOnBasicsOfIncomeId( this.activateroute.snapshot.paramMap.get('incomeId') , updatedIncome).subscribe(data => {
      this.route.navigate(['/income/list'])
    })
  }

}
