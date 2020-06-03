import {incomeAccess} from '../dataLayer/incomeAccess'
import { Income } from '../models/Income'
import {createIncomeRequest, updateIncomeRequest } from '../request/createIncomeRequest'
import * as uuid from 'uuid'


const IncomeAccess = new incomeAccess()

export async function createIncomeService(createIncome: createIncomeRequest){
    var income: Income = {
        incomeId : uuid.v4(),
        amount : createIncome.amount,
        date : new Date().toDateString(),
        Description : createIncome.Description,
        CategoryId :  uuid.v4(),
        userId : uuid.v4(),
        isImage : false
     }
     
   return await IncomeAccess.createIncome(income)
}

export async function getIncomeService(incomeId)
{
    return await IncomeAccess.getIncomeAccess(incomeId)
    
}

export async function getIncomeServiceByUserId(userId){
    return await IncomeAccess.getIncomebyUserId(userId)
}

export async function deleteIncomeServiceByIncomeId(incomeId){
    return await IncomeAccess.deleteIncomeByIncomeId(incomeId)
}

export async function updateIncomeServiceByIncomeId(incomeId, updateRequest : updateIncomeRequest){
    return await IncomeAccess.updateIncomeByIncomeId(incomeId , updateRequest)
}