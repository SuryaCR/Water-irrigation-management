import { Component, OnInit } from '@angular/core';
import {ToastrService} from 'ngx-toastr'
import { Router } from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  value:any;
  typeSelected:string;


  constructor(private toastr:ToastrService,private router:Router,private spinner:NgxSpinnerService) { 
    this.typeSelected = 'ball-fussion'; 
  }

  public showSpinner():void {
    this.spinner.show();
    

    setTimeout(() => {
    this.spinner.hide();
    this.value = localStorage.getItem('userid');
    this.router.navigate(['/dataview'],{queryParams:{data:this.value}});
   },2000);
    
}

  ngOnInit(): void {
    console.log();
  }
  watermanage(){
    this.value = localStorage.getItem('userid');
    this.router.navigate(['/watermanage'],{queryParams:{data:this.value}})
  }
  irrigation(){
    this.value = localStorage.getItem('userid');
    this.router.navigate(['/irrigation'],{queryParams:{data:this.value}})
  }
  logout(){
    this.toastr.success("success","You Logged Out");
    localStorage.clear();
  }

}
