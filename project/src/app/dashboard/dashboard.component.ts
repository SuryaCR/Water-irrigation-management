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
    this.get();
  }
  watermanage(){
    this.router.navigate(['watermanage'],{queryParams:{data:this.user}})
  }
  irrigation(){
    this.router.navigate(['userdata'],{queryParams:{data:this.user}})
  }
  dataview(){
    this.router.navigate(['dataview'],{queryParams:{data:this.user}})
  }
  get(){
    this.api.getData("first-db",this.user).subscribe(data=>{
        this.value= data;
    });
  }


}
