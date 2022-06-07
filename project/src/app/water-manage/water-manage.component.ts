import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators,FormGroup } from '@angular/forms';
import { DatabaseService } from '../database.service';
import { ActivatedRoute } from '@angular/router';
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
  };
  user: any;
  value: any;
  array: any;
  watermanage_value: any;
  watermanage_value1: any;
  watermanage_id: any;
  watermanage_rev: any;

  constructor(private api:DatabaseService,private fb:FormBuilder,private acrouter:ActivatedRoute,private toastr:ToastrService) { 
    this.formGroup = this.fb.group({
      waters: [this.record.waters,Validators.required],
      waters_tree: [this.record.waters_tree,Validators.required],
      waters_non: [this.record.waters_non,Validators.required],
    });
  }

  ngOnInit(): void {
    this.acrouter.queryParams.subscribe(res=>{
      this.user=res.data
    })
  }
  addWaterInfo(){
    this.api.addWaterData(this.formGroup.value,this.user).subscribe(res=>{
      this.value = res;
      this.array = this.value.id;
      localStorage.setItem('WaterManage',this.array);
      this.toastr.success("success","Data Posted");
    },rej=>{
      this.toastr.error("error","Data Not Posted"+rej);

    });
   this.getWaterData();
  }
  getWaterData(){
    this.api.fetchDataByType("watermanage",this.user).subscribe(data=>{
      console.log(data);
      this.watermanage_value = data;
         this.watermanage_value=this.watermanage_value.rows
         this.watermanage_value1 = this.watermanage_value.map((el: any)=>el.doc);
         this.watermanage_id = this.watermanage_value1[0]._id; // getting id of Water Management data
         this.watermanage_rev = this.watermanage_value1[0]._rev; // getting rev id of Water Management data
         console.log(this.watermanage_id);
         console.log(this.watermanage_rev);
         localStorage.setItem("water_id",this.watermanage_id);
         localStorage.setItem("water_rev",this.watermanage_rev);
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
}
