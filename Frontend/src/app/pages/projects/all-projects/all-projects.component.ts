import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-all-projects',
  templateUrl: './all-projects.component.html',
  styleUrls: ['./all-projects.component.css']
})
export class AllProjectsComponent implements  OnInit {

  projects:any

  constructor(private ProjectsService : GlobalService){}

  ngOnInit(): void {
    this.ProjectsService.get('/project/').subscribe((projects)=>{
      this.projects = projects.data
      },
      (error) => {},
    )
  }

  // search(searchKey:any){
  //   console.log(searchKey)
  //   this.projects = this.projects.filter((proj:any) => proj.name.includes(searchKey))
  // }
}
