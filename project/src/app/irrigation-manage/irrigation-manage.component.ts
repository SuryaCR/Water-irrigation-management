import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';
import { CalculationService } from '../calculation.service';
import { DatabaseService } from '../database.service';
import { Router,ActivatedRoute } from '@angular/router';

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

  cropList:any=['Food Crops','Trees','Non-Food Crops'];

  acres1:any;
  hours1:any;
  crops1:any;
  waterLitres:any;

  value: any;
  array: any;
  private id: any;
  user: any;

  constructor(private fb: FormBuilder,private calc:CalculationService,private api:DatabaseService,private router:Router,private acrouter:ActivatedRoute) { 
    this.formGroup = this.fb.group({
      acres: [this.record.acres,Validators.required],
      hours: [this.record.hours,Validators.required],
      crops: [this.record.crops,Validators.required],
    });
  }

  ngOnInit(): void {
    this.acrouter.queryParams.subscribe(res=>{
      this.user=res.data
    })
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

  storing(formValue:any){
    this.acres1 = formValue.acres;
    this.hours1 = formValue.hours;
    this.crops1 = formValue.crops;
    switch(this.crops1){
      case 'Food Crops':
        this.waterLitres = this.calc.foodcrop(this.acres1,this.hours1);
        break;
      case 'Trees':
        this.waterLitres = this.calc.trees(this.acres1,this.hours1);
        break;
      case 'Non-Food Crops':
        this.waterLitres = this.calc.nonfoodcrop(this.acres1,this.hours1);
        break;
    }
    localStorage.setItem('waterLitres', JSON.stringify(this.waterLitres));
  }
  
  savedata(){
    this.api.store1(this.formGroup.value,this.user).subscribe(res=>{
      console.log("Your data was posted successfully!");
      this.value = res;
      this.array = this.value.id;
      this.router.navigate(['additionalinfo'],{queryParams:{data:this.array}})
      
      localStorage.setItem('Irrigationvalue',this.array);

    },rej=>{
      console.log("Can not post data"+rej);
    });

  }

}
