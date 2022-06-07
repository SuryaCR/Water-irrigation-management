import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';
import { DatabaseService } from '../database.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-additional-info',
  templateUrl: './additional-info.component.html',
  styleUrls: ['./additional-info.component.css']
})
export class AdditionalInfoComponent implements OnInit {

  soilList:any=['Black Soil','Red Soil','Clay Soil','Sandy Soil'];
  formGroup: FormGroup;
  record: any = {
    soil: '',
    address: '',
  };

  value: any;
  array: any;
  private _id: any;
  irrigation: any;
  

  constructor(private fb:FormBuilder,private api:DatabaseService,private acrouter:ActivatedRoute) { 
    this.formGroup = this.fb.group({
      soil: [this.record.soil,Validators.required],
      address: [this.record.address,Validators.required],
    });
  }

  ngOnInit(): void {
    this.acrouter.queryParams.subscribe(res=>{
      this.irrigation=res.data
    })
  }

  get soil() {
    return this.formGroup.get('soil')!;
  }
  get address() {
    return this.formGroup.get('address')!;
  }
  addAdditionalData(){
    this.api.addAdditionalInfo(this.formGroup.value,this.irrigation).subscribe(res=>{
      console.log("Your data was posted successfully!"+res);
    },rej=>{
      console.log("Can not post data"+rej);
    });

  }
}
