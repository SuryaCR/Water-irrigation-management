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
    waters_tree:'',
    waters_non:'',
  };
  user: any;
  value: any;
  array: any;

  constructor(private api:DatabaseService,private fb:FormBuilder,private acrouter:ActivatedRoute) { 
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
  showdata(){
    this.api.store(this.formGroup.value,this.user).subscribe(res=>{
      this.value = res;
      this.array = this.value.id;
      localStorage.setItem('WaterManage',this.array);
      console.log("Your data was posted successfully!");
    },rej=>{
      console.log("Can not post data"+rej);
    });
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
