import { Component } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(public global:GlobalService){
    if(localStorage.getItem('token')) this.global.isLoggedIn = true
    console.log(this.global.isLoggedIn)
  }

  logOut(){
    localStorage.removeItem('token')
    this.global.isLoggedIn = false
  }

}
