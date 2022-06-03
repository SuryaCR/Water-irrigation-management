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
  value:any;
  i_value:any;
  w_value:any;
  w_value1: any;
  i_value1: any;

 
  constructor(private api:DatabaseService,private acrouter:ActivatedRoute) {
   }

  ngOnInit(): void {
    this.acrouter.queryParams.subscribe(res=>{
      this.user=res.data
    })
    this.get();
  }

  get(){
    this.api.getData("first-db",this.user).subscribe(data=>{
        this.value= data;
        this.getWater();
        this.getIrrigation();
    });
  }
  getWater(){
    this.api.fetch("first-db","watermanage",this.user).subscribe(data=>{
      this.w_value = data;
         this.w_value=this.w_value.rows
         this.w_value1 = this.w_value.map((el: any)=>el.doc);

         console.log(this.w_value1);
          
    })
  }
  getIrrigation(){
    this.api.fetch("first-db","irrigation",this.user).subscribe(data=>{
      this.i_value = data;
         this.i_value=this.i_value.rows
         this.i_value1 = this.i_value.map((el: any)=>el.doc);

         console.log(this.i_value1);
          
    })

  }

}
