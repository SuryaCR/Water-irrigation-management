import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  alldata:any;
  object:any=[];
  user: any;
  value: any;
  constructor(private acrouter:ActivatedRoute,private router:Router,private api:DatabaseService) { }

  ngOnInit(): void {
    this.acrouter.queryParams.subscribe(res=>{
      this.user=res.data
    })
    this.getUserData();
  }
  watermanagePage(){
    this.router.navigate(['watermanage'],{queryParams:{data:this.user}})
  }
  irrigationPage(){
    this.router.navigate(['userdata'],{queryParams:{data:this.user}})
  }
  dataviewPage(){
    this.router.navigate(['dataview'],{queryParams:{data:this.user}})
  }
  getUserData(){
    this.api.getUserDataById(this.user).subscribe(data=>{
        this.value= data;
    });
  }


}
