import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-data-view',
  templateUrl: './data-view.component.html',
  styleUrls: ['./data-view.component.css']
})
export class DataViewComponent implements OnInit {
  user: any;
  value:any=[];

 
  constructor(private api:DatabaseService,private acrouter:ActivatedRoute) { }

  ngOnInit(): void {
    this.acrouter.queryParams.subscribe(res=>{
      this.user=res.data
    })
 

  }

  get(){
    this.api.getData("first-db",this.user).subscribe(data=>{
        this.value= data;
    });
  }

}
