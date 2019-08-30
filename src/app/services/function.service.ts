import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FunctionService {

  constructor() { }
  m: any;
  mm: any;
  time: any;
  time1: any;
  sec: any;
  dateth: string;
  datetimethai(cdate: any){
    
    this.m=cdate.split('-'); //split YYYY AND MM
    this.time=this.m[2].split('T'); //split dd time
    this.time1=this.time[1].split(':'); //split time
    this.sec=this.time1[2].split('.');   //split milliseconds
    this.m[0]=parseInt(this.m[0])+543;
    this.mm=this.time[0]+"/"+this.m[1]+"/"+this.m[0]+" "+this.time1[0]+":"+this.time1[1];
    return this.mm;
  }
  datethai(cdate: any){
    
    this.m=cdate.split('-');
    this.time=this.m[2].split('T');     
    this.m[0]=parseInt(this.m[0])+543;
    this.mm=this.time[0]+"/"+this.m[1]+"/"+this.m[0];
    return this.mm;
  }
}
