import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators,FormGroup } from '@angular/forms';
import { DatabaseService } from '../database.service';
import { ActivatedRoute,Router } from '@angular/router';
import {ToastrService} from 'ngx-toastr';
@Component({
  selector: 'app-water-manage',
  templateUrl: './water-manage.component.html',
  styleUrls: ['./water-manage.component.css']
})
export class WaterManageComponent implements OnInit {

  formGroup: FormGroup;
  waterValue:any;
  waterLitre:any;
  totalWater:any;

  record: any = {
    waters: '',
    waters_tree:'',
    waters_non:'',
    date:''
  };
  user: any;
  userValue: any;
  array: any;
  watermanage_value: any;
  watermanage_value1: any;
  watermanage_id: any;
  watermanage_rev: any;
  foodCropValue:any;
  nonFoodCropValue:any;
  treeValue:any;
  array2: any;

  constructor(private api:DatabaseService,private fb:FormBuilder,private acrouter:ActivatedRoute,private toastr:ToastrService,private router:Router) { 
    this.formGroup = this.fb.group({
      waters: [this.record.waters,Validators.required],
      waters_tree: [this.record.waters_tree,Validators.required],
      waters_non: [this.record.waters_non,Validators.required],
      date:[this.record.date,Validators.required]
    });
  }

  ngOnInit(): void {
    this.acrouter.queryParams.subscribe(res=>{
      this.user=res.data
    },rej=>{
      console.log(rej);
    })
    console.log(this.formGroup);
  }
  addWaterInfo(){
    this.api.addWaterData(this.formGroup.value,this.user).subscribe(res=>{
      this.userValue = res;
      this.array = this.userValue.id;
      this.array2 = this.userValue.rev;
      localStorage.setItem('WaterManageId',this.array);
      localStorage.setItem('WaterManageRev',this.array2);
      this.toastr.success("success","Data Posted");
      this.getWaterData();
      
    },rej=>{
      this.toastr.error(rej.error.reason);

    });
  }
  getWaterData(){
    this.api.fetchDataByType("watermanage",this.user).subscribe(data=>{
      console.log(data);
      this.watermanage_value = data;
      console.log(this.watermanage_value);
         this.watermanage_value=this.watermanage_value.rows
         this.watermanage_value1 = this.watermanage_value.map((el: any)=>el.doc);
         this.watermanage_id = this.watermanage_value1[0]._id; // getting id of Water Management data
         this.watermanage_rev = this.watermanage_value1[0]._rev; // getting rev id of Water Management data

         this.foodCropValue = this.watermanage_value1[0].Water_food;
         this.nonFoodCropValue = this.watermanage_value1[0].Water_non_food;
         this.treeValue = this.watermanage_value1[0].Water_tree;

         localStorage.setItem("foodCropValue",this.foodCropValue)
         localStorage.setItem("nonFoodCropValue",this.nonFoodCropValue)
         localStorage.setItem("treeValue",this.treeValue)

         console.log(this.watermanage_id);
         console.log(this.watermanage_rev);
         localStorage.setItem("water_id",this.watermanage_id);
         localStorage.setItem("water_rev",this.watermanage_rev);
    },rej=>{
      console.log(rej);
    })
  }
  

  get waters() {
    return this.formGroup.get('waters')!;
  }
  get waters_tree(){
    return this.formGroup.get('waters_tree')!;
  }
  get waters_non(){
    return this.formGroup.get('waters_non')!;
  }
  get date(){
    return this.formGroup.get('date')!;
  }

  dashboard(){
    this.router.navigate(['/dashboard'],{queryParams:{data:this.user}});
  }
}
