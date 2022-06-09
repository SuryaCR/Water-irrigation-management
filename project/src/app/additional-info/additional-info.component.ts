import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';
import { DatabaseService } from '../database.service';
import { ActivatedRoute } from '@angular/router';
import {ToastrService} from 'ngx-toastr'

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
  user:any;
  

  constructor(private fb:FormBuilder,private api:DatabaseService,private acrouter:ActivatedRoute,private toastr:ToastrService) { 
    this.formGroup = this.fb.group({
      soil: [this.record.soil,Validators.required],
      address: [this.record.address,Validators.required],
    });
  }

  ngOnInit(): void {
    this.acrouter.queryParams.subscribe(res=>{
      this.irrigation=res.data;
    },rej=>{console.log(rej)})
    this.acrouter.queryParams.subscribe(response=>{
      this.user = response.data1;
    },rejection=>{console.log(rejection)})
  }

  get soil() {
    return this.formGroup.get('soil')!;
  }
  get address() {
    return this.formGroup.get('address')!;
  }
  addAdditionalData(){
    this.api.addAdditionalInfo(this.formGroup.value,this.irrigation,this.user).subscribe(res=>{
      console.log(res);
      this.toastr.success("Success","Your data posted");
    },rej=>{
      console.log("Can not post data"+rej);
    });

  }
}
