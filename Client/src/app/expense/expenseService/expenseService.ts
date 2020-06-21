import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { localStorageValues } from 'src/app/util/LocalStorageValue';
import { urlForServer } from 'src/app/util/config';

@Injectable()
export class expenseService {
    wholeUrl = urlForServer.wholeUrl;
    constructor(private http: HttpClient){

    }

    getExpenses(){
        var userId = localStorage.getItem(localStorageValues.userId)
        return this.http.get(`${this.wholeUrl}/expenseByUser`)
    }

    addExpense(createExpenseModel){
        return this.http.post(`${this.wholeUrl}/expense`,createExpenseModel)
      }

      getExpenseBasedOnExpenseId(expenseId: string){
          return this.http.get(`${this.wholeUrl}/expense/${expenseId}`)
      }

      updateExpenseOnBasicsOfExpenseId(expenseId: string, updateExpenseModel){
          return this.http.put(`${this.wholeUrl}/expense/${expenseId}`, updateExpenseModel)
      }

      deleteExpenseOnBasicsOfExpenseId(expenseId){
          return this.http.delete(`${this.wholeUrl}/expense/${expenseId}`)
      }
}