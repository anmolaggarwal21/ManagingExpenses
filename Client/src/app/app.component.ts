import { Component,OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { util } from './util/util';
import { AuthService } from './util/authService';
import { localStorageValues } from './util/LocalStorageValue';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  title = 'Manage Expense';
 
  seeProfileVariable: boolean = false;

  constructor( private route: Router , public auth: AuthService, public utilInstance : util ){}

  ngOnInit(){
    
   var windowsPath =  window.location.pathname
    var configFilter = this.route.config.find(x=> x.path == windowsPath.substring(1, windowsPath.length))
    if (configFilter != null){
      this.utilInstance.link = configFilter.path.split('/')[0]
    }
    // if(this.link == 'callback'){
    //   this.link = false
    // }

     this.utilInstance.idToken = localStorage.getItem(localStorageValues.idToken)
     if(this.utilInstance.idToken){
       
        this.utilInstance.picture = localStorage.getItem(localStorageValues.picture)
     }
   
  }
  

  setValue(value: string){
    console.log(' setting value in the route ')
    this.utilInstance.idToken = localStorage.getItem(localStorageValues.idToken)
    this.seeProfileVariable = false
    this.utilInstance.link =  value
    
    this.route.navigate(['/' +value +'/list'])
  }

  seeProfile(){
    console.log('see profile')
    this.seeProfileVariable = true
    this.route.navigate(['/profile'])
  }


}
