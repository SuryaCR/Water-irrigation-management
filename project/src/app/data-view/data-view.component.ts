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
  userValue:any;
  irrigation_value:any;
  watermanage_value:any;
  additional_value:any;
  watermanage_value1: any;
  irrigation_value1: any;
  additional_value1: any;
  irrigtion_id: any;
  watermanage_id: any;
  additional_id: any;
  irrigation_rev:any;
  watermanage_rev:any;
  additional_rev:any;


  searchText:any;
  foodCrop: any;
  nonFoodCrop: any;
  trees: any;
 
  constructor(private api:DatabaseService,private acrouter:ActivatedRoute) {
   }

  ngOnInit(): void {
    this.acrouter.queryParams.subscribe(res=>{
      this.user=res.data
    },rej=>{console.log(rej)})
    this.getUserData();
    this.foodCrop = localStorage.getItem('foodCropValue');
    this.nonFoodCrop = localStorage.getItem('nonFoodCropValue');
    this.trees = localStorage.getItem('treeValue');
  }

  getUserData(){
    this.api.getUserDataById(this.user).subscribe(data=>{
        this.userValue= data;
        this.getWaterData();
        this.getIrrigationData();
        this.getAdditionalData();
    },rej=>{
      console.log(rej);
    });
  }
  getWaterData(){
    this.api.fetchDataByType("watermanage",this.user).subscribe(data=>{
      console.log(data);
      this.watermanage_value = data;
         this.watermanage_value=this.watermanage_value.rows
         this.watermanage_value1 = this.watermanage_value.map((el: any)=>el.doc);
         this.watermanage_id = this.watermanage_value1[0]._id; // getting id of Water Management data
         this.watermanage_rev = this.watermanage_value1[0]._rev; // getting rev id of Water Management data
         console.log(this.watermanage_rev)
         
    },rej=>{
      console.log(rej);
    })
  }
  getIrrigationData(){
    this.api.fetchDataByType("irrigation",this.user).subscribe(data=>{
      this.irrigation_value = data;
         this.irrigation_value=this.irrigation_value.rows
         this.irrigation_value1 = this.irrigation_value.map((el: any)=>el.doc);
         this.irrigtion_id = this.irrigation_value1[0]._id; // getting id of Irrigation Management data
         this.irrigation_rev = this.irrigation_value1[0]._rev; // getting rev id of Irrigation Management data
         
    },rej=>{
      console.log(rej);
    })

  }
  getAdditionalData(){
    this.api.fetchDataByType("additional_Info",this.user).subscribe(data=>{
      this.additional_value = data;
         this.additional_value=this.additional_value.rows
         this.additional_value1 = this.additional_value.map((el: any)=>el.doc);
         this.irrigtion_id = this.additional_value1[0]._id; // getting id of additional Management data
         this.additional_rev = this.additional_value1[0]._rev; // getting rev id of additional Management data
         
    },rej=>{
      console.log(rej);
    })

  }

}
