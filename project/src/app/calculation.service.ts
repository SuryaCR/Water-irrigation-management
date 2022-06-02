import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculationService {

  waterLitres:any;
  totalPlants:any;
  constructor() { }
  foodcrop(acres1:any,hours1:any){
    this.totalPlants = acres1*17800;
    this.waterLitres = this.totalPlants*0.2/24;
    this.waterLitres = Math.floor(this.waterLitres*hours1);
    return this.waterLitres;
  }
  nonfoodcrop(acres1:any,hours1:any){
    this.totalPlants = acres1*17800;
    this.waterLitres = this.totalPlants*0.3/24;
    this.waterLitres = Math.floor(this.waterLitres*hours1);
    return this.waterLitres;
  }
  trees(acres1:any,hours1:any){
    this.totalPlants = acres1*530;
    this.waterLitres = this.totalPlants*0.9/24;
    this.waterLitres = Math.floor(this.waterLitres*hours1);
    return this.waterLitres;
  }
}
