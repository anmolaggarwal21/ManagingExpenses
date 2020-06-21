import { Component, OnInit } from '@angular/core';
import { expenseService } from '../expenseService/expenseService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-getexpense',
  templateUrl: './getexpense.component.html',
  styleUrls: ['./getexpense.component.css']
})
export class GetexpenseComponent implements OnInit {
  displayedColumns: string[] = ['amount', 'date', 'Description', 'Update','Delete']
  expenses : any
  constructor(private _expenseService: expenseService, private route: Router) { }

  ngOnInit(): void {
    this._expenseService.getExpenses().subscribe(data=> {
      this.expenses = (data as any).item
    })
  }

  updateExpense(updateExpense){

    this.route.navigate([`expense/update/${updateExpense}`])

  }

  deleteExpense(expenseId){
    this._expenseService.deleteExpenseOnBasicsOfExpenseId(expenseId).subscribe(dataa=>{
      this._expenseService.getExpenses().subscribe(data=> {
        this.expenses = (data as any).item
      })
    })
  }

}
