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
  value: any;
  array: any;
  watermanage_value: any;
  watermanage_value1: any;
  watermanage_id: any;
  watermanage_rev: any;
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
      this.value = res;
      this.array = this.value.id;
      this.array2 = this.value.rev;
      localStorage.setItem('WaterManageId',this.array);
      localStorage.setItem('WaterManageRev',this.array2);
      this.toastr.success("success","Data Posted");
      
    },rej=>{
      this.toastr.error(rej.error.reason);

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
    },rej=>{
      console.log(rej);
    })
    setTimeout(() => {
      location.reload();
    }, 2000);
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
