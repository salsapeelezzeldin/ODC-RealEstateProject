import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements  OnInit{

  profile:any

  constructor(private global : GlobalService){}

  ngOnInit(): void {
    this.global.get('/user/me').subscribe((res)=>{
      this.profile = res.data
      },
      (error) => {},
    )
  }

}
