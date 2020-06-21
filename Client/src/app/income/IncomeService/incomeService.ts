import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { localStorageValues } from 'src/app/util/LocalStorageValue';
import { urlForServer } from 'src/app/util/config';

@Injectable()
export class incomeService {
  wholeUrl = urlForServer.wholeUrl;
  constructor(private http: HttpClient) { }

  addIncome(createIncomeModel){
    return this.http.post(`${this.wholeUrl}/income`,createIncomeModel)
  }

  getIncomeService(){
    var userId = localStorage.getItem(localStorageValues.userId)
    return this.http.get(`${this.wholeUrl}/incomeByUser`)
  }

  getIncomeOnBasicsOfIncomeId(incomeId: string){
    return this.http.get(`${this.wholeUrl}/income/${incomeId}`)
  }

  updateIncomeOnBasicsOfIncomeId(incomeId: string, updateBody){
    return this.http.put(`${this.wholeUrl}/income/${incomeId}`, updateBody)
  }

  deleteIncomeOnBasicsOfIncomeId(incomeId: string){
    return this.http.delete(`${this.wholeUrl}/income/${incomeId}`)
  }

}