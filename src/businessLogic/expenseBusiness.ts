import {expenseAccess} from '../dataLayer/expenseAccess'
import { Expense } from '../models/Expense'
import * as uuid from 'uuid'
import { createExpenseRequest, updateExpenseRequest } from '../request/createExpenseRequest'


const ExpenseAccess = new expenseAccess()

export async function createExpenseeService(createExpense: createExpenseRequest){
    var expense: Expense = {
        expenseId : uuid.v4(),
        amount : createExpense.amount,
        date : new Date().toDateString(),
        Description : createExpense.Description,
        CategoryId :  uuid.v4(),
        userId : uuid.v4(),
        accountId: createExpense.accountId,
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

export async function updateExpenseServiceByExpenseId(expenseId, updateRequest : updateExpenseRequest){
    return await ExpenseAccess.updateExpenseByExpenseId(expenseId , updateRequest)
}