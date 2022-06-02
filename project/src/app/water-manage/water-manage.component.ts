import { createOfflineCompileUrlResolver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators,FormGroup } from '@angular/forms';
import { DatabaseService } from '../database.service';
import { ActivatedRoute } from '@angular/router';

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
  };
  user: any;

  constructor(private api:DatabaseService,private fb:FormBuilder,private acrouter:ActivatedRoute) { 
    this.formGroup = this.fb.group({
      waters: [this.record.waters,Validators.required],
      type:'water',
    });
  }

  ngOnInit(): void {
    this.acrouter.queryParams.subscribe(res=>{
      this.user=res.data
    })
  }
  showdata(){
    this.api.store(this.formGroup.value,this.user).subscribe(res=>{
      console.log("Your data was posted successfully!");
    },rej=>{
      console.log("Can not post data"+rej);
    });
  }

  get waters() {
    return this.formGroup.get('waters')!;
  }
}
