import { Component, OnInit } from '@angular/core';
import { incomeService } from '../IncomeService/IncomeService';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";  

@Component({
  selector: 'app-getincome',
  templateUrl: './getincome.component.html',
  styleUrls: ['./getincome.component.css']
})
export class GetincomeComponent implements OnInit {
  hiddenValue = false;
  constructor(private _incomeService : incomeService, private route : Router , private spinnerService: NgxSpinnerService ) { }
  displayedColumns: string[] = ['amount', 'date', 'Description', 'Update','Delete'];
  incomes: any[];
  ngOnInit(): void {
    
    this._incomeService.getIncomeService().subscribe(data=> {
    this.incomes = (data as any).item
     
    })
  }
 

  updateIncome(value){
    console.log('value after updating is', value)
    this.route.navigate([`/income/update/${value}`])
  }
  deleteIncome(value){
    this.spinnerService.show();
    this._incomeService.deleteIncomeOnBasicsOfIncomeId(value).subscribe(data=>
      this._incomeService.getIncomeService().subscribe(data=> {
        this.incomes = (data as any).item
        this.spinnerService.hide();
      }) 
      )
    
  }
}
