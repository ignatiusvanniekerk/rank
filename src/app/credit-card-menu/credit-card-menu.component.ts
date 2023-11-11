import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, FormControl,Validators} from '@angular/forms';
import { CreditCardMaskPipe } from '../helpers/creditcard.pipe';
import { COUNTRY_LIST, COUNTRY_LIST_BANED } from '../helpers/country-code';
import { HelperService } from '../helpers/helper.service';

export const months = Array.from({length: 12}, (x, i) => i+1).map((value: number)=> {
  const valueStr = value.toString()
  return valueStr.length > 1 ? valueStr : `0${valueStr}`});
export const years = Array.from({length: 10}, (x, i) => i+23);
@Component({
  selector: 'credit-card-menu',
  templateUrl: './credit-card-menu.component.html',
  styleUrls: ['./credit-card-menu.component.css'],
  providers: [CreditCardMaskPipe]
})
export class CreditCardMenuComponent {
  notValidation: boolean = false
  isBanned: boolean = false  
  countryList  = COUNTRY_LIST
  bannedCountryListCodes: Array<string>
  months: string[] = months
  years:number[] = years

  profileForm: FormGroup = this.fb.group({
    ccNum: ['', Validators.required],
    month: ['', Validators.required],   
    year: ['', Validators.required],  
    cvv: ['', Validators.required],   
    country:['', Validators.required]
  });
  validationErrorMessage = ""
  payLoad: string = '';
  constructor(
    private fb: FormBuilder,
    private helperService: HelperService) {
    this.bannedCountryListCodes = this.helperService.getBannedList()?.map((item: any)=> item.code)
    this.helperService.bannedCountryListCodesChanged.subscribe((value)=>{
      this.bannedCountryListCodes = value?.map((item: any)=> item.code)
     })
   }

  onSubmit() {  
    this.notValidation = !this.profileForm.valid
    let rawData = this.profileForm.getRawValue()
    let cardEx = this.creditCardCheck(rawData.ccNum)
    console.log(cardEx)
    if(!this.profileForm.valid){
      setTimeout(()=>{
        this.notValidation = !this.notValidation
      }, 5000)      
      return 
    }else if(this.isBanned || cardEx?.ccNum){
      this.validationErrorMessage = this.isBanned ? 'Please complete all fields': "Card Number has been used before"
      return
    }else{
      this.validationErrorMessage = ""
    }
    this.helperService.setCreditCardList(rawData);
  }

  creditCardCheck(creditCardNum: string){
    return this.helperService.getCreditCardList()?.find((item)=> {      
      return item.ccNum.toString() === creditCardNum.toString()} )
  }

  countrySelection(event: {code?: string}){
    this.isBanned = this.bannedCountryListCodes.includes(event?.code as string)
    if(this.isBanned){
      this.disable()
    }else{
      this.enable()
    }
  }

  enable(){
    this.profileForm.get('ccNum')?.enable();
    this.profileForm.get('month')?.enable();
    this.profileForm.get('year')?.enable();
    this.profileForm.get('cvv')?.enable();
  }

  disable(){
    this.profileForm.get('ccNum')?.disable();
    this.profileForm.get('month')?.disable();
    this.profileForm.get('year')?.disable();
    this.profileForm.get('cvv')?.disable();
  }
}
