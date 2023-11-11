import { Component, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { COUNTRY_LIST, COUNTRY_LIST_BANED } from '../helpers/country-code';
import { MatSelectionList } from '@angular/material/list';
import { HelperService } from '../helpers/helper.service';


@Component({
  selector: 'banned-country-list',
  templateUrl: './banned-country-list.component.html',
  styleUrls: ['./banned-country-list.component.css'],
})
export class BannedCountryListComponent implements OnInit {
  countryList  = COUNTRY_LIST
  bannedCountryListCodes: any[]
  value: string = ''
  displayAll: boolean = true
  profileForm: FormGroup = this.fb.group({
    formControlObj: ['', Validators.required],
    searchControlObj: ['', Validators.required],   
  });
  @ViewChild('countrySelectedList', {static: true}) countrySelectedList: MatSelectionList | undefined;
  constructor(private fb: FormBuilder,private helperService: HelperService) {
     this.bannedCountryListCodes = this.helperService.getBannedList()
   }

   
    ngOnInit(): void {
      this.profileForm.controls['formControlObj'].setValue(this.bannedCountryListCodes);
        this.countrySelectedList?.selectedOptions
    }
  


  toggleChange(event: any){
    this.displayAll = !this.displayAll
    if(this.displayAll){
      this.countryList = COUNTRY_LIST
    }else{
      this.countryList = this.bannedCountryListCodes
    }
  }
  onSearchChange(event: any): void {      
    this.displayAll = true
    if(!event.target.value || this.value !== event.target.value?.toLowerCase()){
      this.countryList = COUNTRY_LIST
    }
    this.value = event.target.value?.toLowerCase()
    this.countryList = this.countryList.filter((cnt)=> cnt.name?.toLowerCase()?.includes(this.value))
    this.profileForm.controls['formControlObj'].setValue(this.bannedCountryListCodes);    
  }

  compare(c1: {code: string}, c2: {code: string}) {
    return c1 && c2 && c1.code === c2.code;
  }

  countryCheck(event: {code?: string}){
    this.bannedCountryListCodes.includes(event?.code as string)
  }
  selectionChange(){
    this.bannedCountryListCodes = this.countrySelectedList?._value || []
    this.helperService.setBannedList(this.countrySelectedList?._value)
  }
}
