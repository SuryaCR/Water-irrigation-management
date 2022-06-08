import { Component, OnInit } from '@angular/core';
import {ToastrService} from 'ngx-toastr'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private toastr:ToastrService) { console.log();}


  ngOnInit(): void {
    console.log();
  }
  pleaseLogin(){
    this.toastr.error("","Pleae Login");
  }
  logout(){
    this.toastr.success("success","You Logged Out");
  }

}
