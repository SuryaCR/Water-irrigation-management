import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-data-view',
  templateUrl: './data-view.component.html',
  styleUrls: ['./data-view.component.css']
})
export class DataViewComponent implements OnInit {

  alldata:any;
  object:any=[];
  user: any;
  constructor(private acrouter:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.acrouter.queryParams.subscribe(res=>{
      this.user=res.data
    })
  }
  watermanage(){
    this.router.navigate(['watermanage'],{queryParams:{data:this.user}})
  }
  irrigation(){
    this.router.navigate(['userdata'],{queryParams:{data:this.user}})
  }

}
