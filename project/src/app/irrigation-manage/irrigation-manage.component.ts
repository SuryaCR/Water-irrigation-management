import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';
import { CalculationService } from '../calculation.service';
import { DatabaseService } from '../database.service';
import { Router,ActivatedRoute } from '@angular/router';
import {ToastrService} from 'ngx-toastr'

@Component({
  selector: 'app-irrigation-manage',
  templateUrl: './irrigation-manage.component.html',
  styleUrls: ['./irrigation-manage.component.css']
})
export class IrrigationManageComponent implements OnInit {
  formGroup: FormGroup;
  record: any = {
    acres: '',
    hours: '',
    crops:'',
  };

  cropList:any=['Food-Crops','Trees','Non-Food Crops'];

  acres1:any;
  hours1:any;
  crops1:any;
  waterLitres:any;

  value: any;
  array: any;
  private id: any;
  user: any;

  watermanage_id:any;
  watermanage_rev:any;
  value1: any;
  value2:any;
  updatedData: any;
  waters: any;
  value3: any;
  value4:any;
  array1: any;
  array2: any;
  value5: any;

  constructor(private fb: FormBuilder,private calc:CalculationService,private api:DatabaseService,private router:Router,private acrouter:ActivatedRoute,private toastr:ToastrService) { 
    this.formGroup = this.fb.group({
      acres: [this.record.acres,Validators.required],
      hours: [this.record.hours,Validators.required],
      crops: [this.record.crops,Validators.required],
    });
  }

  ngOnInit(): void {
    this.acrouter.queryParams.subscribe(res=>{
      this.user=res.data
    },rej=>{console.log(rej)})
    this.watermanage_id = localStorage.getItem('WaterManageId');
    this.watermanage_rev = localStorage.getItem('WaterManageRev');
    this.getWaterValue();
  }

  get acres() {
    return this.formGroup.get('acres')!;
  }
  get hours() {
    return this.formGroup.get('hours')!;
  }
  get crops() {
    return this.formGroup.get('crops')!;
  }

  addFormValue(formValue:any){
    this.acres1 = formValue.acres;
    this.hours1 = formValue.hours;
    this.crops1 = formValue.crops;
    switch(this.crops1){
      case 'Food-Crops':
        this.waterLitres = this.calc.foodcrop(this.acres1,this.hours1);
        break;
      case 'Trees':
        this.waterLitres = this.calc.trees(this.acres1,this.hours1);
        break;
      case 'Non-Food Crops':
        this.waterLitres = this.calc.nonfoodcrop(this.acres1,this.hours1);
        break;
      default:
          this.waterLitres = 0;
          break;
    }
    if(this.waterLitres>0){
    localStorage.setItem('waterLitres', JSON.stringify(this.waterLitres));
    this.saveWaterData();
    }
    else{
      this.toastr.error("error","Enter Value");
    }
  }
  
  saveWaterData(){
    this.api.addIrrigationData(this.formGroup.value,this.user).subscribe(res=>{
      this.toastr.success("success","Your Data Posted");
      this.value = res;
      this.array = this.value.id;
      this.api.getUserDataById(this.array).subscribe(response=>{
        this.array1 = response;
        this.array2 = this.array1.Crops;
        this.waters = localStorage.getItem('waterLitres');
        switch(this.array2){
          case 'Food-Crops':
           this.value2 = this.value1.Water_food;
           this.updatedData = this.value2-this.waters;
           this.api.updateWaterData(this.watermanage_id,this.value1,this.user,this.updatedData).subscribe(response1=>{
             console.log(response1);
           })
           break;
          case 'Trees':
           this.value3 = this.value1.Water_tree;
           this.updatedData = this.value3-this.waters;
           this.api.updateWaterTreeData(this.watermanage_id,this.value1,this.user,this.updatedData).subscribe(response2=>{
             console.log(response2);
           })
           break;
          case 'Non-Food Crops':
           this.value4 = this.value1.Water_non_food;
           this.updatedData = this.value4-this.waters;
           this.api.updateWaterNonData(this.watermanage_id,this.value1,this.user,this.updatedData).subscribe(response3=>{
             console.log(response3);
           })
           break;
        }
      },rej=>{console.log(rej)})
    },rej=>{
      this.toastr.error("error","Your Data Not Posted"+rej);
    });

  }

  getWaterValue(){
    this.api.getUserDataById(this.watermanage_id).subscribe(res=>{
      console.log(res);
      this.value1 = res; 
    },rej=>{
      console.log(rej);
    });
  }

  dashboard(){
    this.router.navigate(['/dashboard'],{queryParams:{data:this.user,data1:this.array}});
  }

  reDirecting(){
    this.router.navigate(['/dashboard'],{queryParams:{data:this.user,data1:this.array}});
  }
}
