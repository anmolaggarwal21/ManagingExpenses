import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms'
import {HttpClientModule, HTTP_INTERCEPTORS}  from '@angular/common/http'
import {MatSidenavModule} from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule } from '@angular/material/button';
import { NgxSpinnerModule } from "ngx-spinner";  
import {MatMenuModule} from '@angular/material/menu';

import { AppComponent } from './app.component';
import { ListCategoriesComponent } from './categories/list-categories.component';
import { MatTableModule } from '@angular/material/table';
import { CreateCategoriesComponent } from './categories/create-categories.component';
import { categoryService } from './categories/categoryService';
import { ListaccountComponent } from './Account/listaccount/listaccount.component';
import { accountService } from './Account/Service/accountService';
import { CreateaccountComponent } from './Account/createaccount/createaccount.component';
import { GetincomeComponent } from './income/getincome/getincome.component';
import { CreateincomeComponent } from './income/createincome/createincome.component';
import { incomeService } from './income/IncomeService/IncomeService';
import { UpdateincomeComponent } from './income/updateincome/updateincome.component';
import { UpdatecategoryComponent } from './category/updatecategory/updatecategory.component';
import { UpdateaccountComponent } from './Account/updateaccount/updateaccount.component';
import { GetexpenseComponent } from './expense/getexpense/getexpense.component';
import { expenseService } from './expense/expenseService/expenseService';
import { CreateexpenseComponent } from './expense/createexpense/createexpense.component';
import { UpdateexpenseComponent } from './expense/updateexpense/updateexpense.component';
import { util } from './util/util';
import { CallbackComponent } from './callback/callback.component';
import { ProfileComponent } from './profile/profile.component';
import { InterceptorService } from './util/interceptor.service';
import { LoaderComponent } from './loader/loader.component';


const appRoutes: Routes=[{
  path: 'category/list' , component: ListCategoriesComponent},
  { path : 'category/create', component: CreateCategoriesComponent},
  { path : 'category/update/:categoryId', component: UpdatecategoryComponent},
  { path : 'account/list', component: ListaccountComponent},
  { path : 'account/create', component: CreateaccountComponent},
  { path : 'account/update/:accountId', component: UpdateaccountComponent},
  { path : 'income/list', component: GetincomeComponent},
  { path : 'income/create', component: CreateincomeComponent},
  {path: 'income/update/:incomeId', component: UpdateincomeComponent},
  { path : 'expense/list', component: GetexpenseComponent},
  { path : 'expense/create', component: CreateexpenseComponent},
  { path : 'expense/update/:expenseId', component: UpdateexpenseComponent},
  {path : 'callback' , component : CallbackComponent},
  {path : 'profile' , component : ProfileComponent}
  //{path: '', redirectTo : 'category/list', pathMatch: 'full'}
]
@NgModule({
  declarations: [
    AppComponent,
    ListCategoriesComponent,
    CreateCategoriesComponent,
    ListaccountComponent,
    CreateaccountComponent,
    GetincomeComponent,
    CreateincomeComponent,
    UpdateincomeComponent,
    UpdatecategoryComponent,
    UpdateaccountComponent,
    GetexpenseComponent,
    CreateexpenseComponent,
    UpdateexpenseComponent,
    CallbackComponent,
    ProfileComponent,
    LoaderComponent,

  ],
  imports: [
    BrowserModule,
    MatTableModule,
    FormsModule,
    HttpClientModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatCheckboxModule,
    MatButtonModule,
    NgxSpinnerModule,
    MatMenuModule,
    RouterModule.forRoot(appRoutes)

  ],
  providers: [categoryService, accountService,incomeService, expenseService ,{provide :HTTP_INTERCEPTORS,useClass :InterceptorService,multi :true} ],
  bootstrap: [AppComponent]
})
export class AppModule { 

 
}
