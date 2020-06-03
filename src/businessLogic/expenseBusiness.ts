import {expenseAccess} from '../dataLayer/expenseAccess'
import { Expense } from '../models/Expense'
import {createIncomeRequest, updateIncomeRequest } from '../request/createIncomeRequest'
import * as uuid from 'uuid'


const ExpenseAccess = new expenseAccess()

export async function createExpenseeService(createIncome: createIncomeRequest){
    var expense: Expense = {
        expenseId : uuid.v4(),
        amount : createIncome.amount,
        date : new Date().toDateString(),
        Description : createIncome.Description,
        CategoryId :  uuid.v4(),
        userId : uuid.v4(),
        isImage : false
     }
     
   return await ExpenseAccess.createExpense(expense)
}

export async function getExpenseService(expenseId)
{
    return await ExpenseAccess.getExpenseAccess(expenseId)
    
}

export async function getExpenseServiceByUserId(userId){
    return await ExpenseAccess.getExpensebyUserId(userId)
}

export async function deleteExpenseServiceByExpenseId(expenseId){
    return await ExpenseAccess.deleteExpenseByExpenseId(expenseId)
}

export async function updateExpenseServiceByExpenseId(expenseId, updateRequest : updateIncomeRequest){
    return await ExpenseAccess.updateExpenseByExpenseId(expenseId , updateRequest)
}