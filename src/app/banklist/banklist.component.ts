import { Component, ViewChild, OnInit, AfterViewInit, OnDestroy, QueryList, ViewChildren } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Subject, Subscription } from 'rxjs';
// import { startWith } from 'rxjs/operators';

import { Router, NavigationExtras } from '@angular/router';
import { DataService } from '../service/data.service';
import { DataTableDirective } from 'angular-datatables';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';

@Component({
  selector: 'app-banklist',
  templateUrl: './banklist.component.html',
  styleUrls: ['./banklist.component.css']
})
export class BanklistComponent implements AfterViewInit, OnDestroy, OnInit {
  dataTable : any;
  @ViewChild('dataTable') table;
//   @ViewChildren(DataTableDirective)static : false
  @ViewChild(DataTableDirective)static : false
  datatableElement: DataTableDirective;
  dtElement: DataTableDirective;
  dtInstance: DataTables.Api;
  dtTrigger: Subject<any> = new Subject();
  dtOptions: any;
sub : Subscription;
	// dtOptions: DataTables.Settings = {};
 
  cities = []; 
  selectedcity : string = "";
  showSpinner: boolean = true;
  banks ;
  message : any=[];
  setval : any="" ;
  fav : any =[];
   dataa :any =[];
   
  constructor(  private http: HttpClient , private data : DataService,private _router : Router) {
   

  }
  
  someClickHandler(info: any): void { 
    let navigationExtras: NavigationExtras = {
      queryParams: {
    
          "ifsc": "ifsc",
          "bankid": info[1],
          "branch": info[2],
          "address": info[3],
          "city": info[4],
          "district": info[5],
          "state": info[6],
          "bank_name": info[7],
          
      }
  };
  this._router.navigate(["bank"], navigationExtras);

    // this._router.navigate(['bank/',]);
  }
  ngOnInit(): void {

    this.cities=['MUMBAI', 'DELHI', 'JAIPUR', 'ALWAR', 'BANGALORE'];
    this.fav=[ 'ABHY0065001', 'ABHY0065003' ,'ABHY0065004'];
    this.dtOptions = { 
      pagingType: 'full_numbers',
      pageLength: 5,
      order: false ,
      processing: true,
      rowCallback: (row: Node, data: any[] | Object, index: number) => {
        const self = this;
        // Unbind first in order to avoid any duplicate handler
        // (see https://github.com/l-lin/angular-datatables/issues/87)
        $('td', row).unbind('click');
        $('td', row).bind('click', () => {
        
          self.someClickHandler(data);
        });
        return row;
        
      }
    };
    this.sub=this.data.loaddata("JAIPUR").subscribe(data => {
      this.banks = data;
     this.dtTrigger.next();
      this.showSpinner = false;
    });


       
  }
  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
    console.log("ng destrrot");
    this.sub.unsubscribe();
    
   // this.dtTrigger.unsubscribe();
  }

  afterView() {

    // this.sub.unsubscribe();
    console.log(this.datatableElement);
    // console.log(this.dtInstance);
    try {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        // Destroy the table first
        console.log(this.dtInstance);
        dtInstance.destroy();
        // Call the dtTrigger to rerender again
        this.dtTrigger.next();
      });
    } catch (err) {
      console.log(err);
    }
   
}
 
 setSelectedcity(city : string){
       // this.dtTrigg;er.unsubscribe();
      // Destroy the table first
      // this.dtInstance.destroy();
      // Call the dtTrigger to rerender again
     // this.dtTrigger.next();
    //this.dtTrigger
    //this.dtTrigger.unsubscribe();
    this.selectedcity=city;
   this.sub= this.data.loaddata(city).subscribe(data => {
      this.showSpinner = false;
      this.banks = data;
     // this.afterView();
     // this.dtTrigger.next();
      // this.dtInstance.destroy();
      //this.dtTrigger.next();
      //console.log(this.banks);
    });


  //  console.log(this.selectedcity);
  //   if(this.banks.length === 0  || this.selectedcity===''){
  //     return this.banks;
  //   }
  //   else{
  //    let resultarray = [];      // this.dtTrigger.next();


  //   for(const item of this.banks){

  //     if(item.city==this.selectedcity){

  //      resultarray.push(item);
  //     }
  //   }
  //   console.log(resultarray);
  //   if(resultarray.length==0)
  //   {
  //     this.banks=resultarray;
  //   }else{
  //     this.banks=this.banks;
  //   }
  // }
}

 
}
