import { Component, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { COUNTRY_LIST, COUNTRY_LIST_BANED } from '../helpers/country-code';
import { MatSelectionList } from '@angular/material/list';
import { HelperService } from '../helpers/helper.service';


@Component({
  selector: 'credit-card-list',
  templateUrl: './credit-card-list.component.html',
  styleUrls: ['./credit-card-list.component.css'],
})
export class CreditCardListComponent {
  creditCardList: any[]  = []
  value: string = ''
  displayAll: boolean = true
 
  @ViewChild('countrySelectedList', {static: true}) countrySelectedList: MatSelectionList | undefined;
  constructor(private fb: FormBuilder,private helperService: HelperService) {
     this.creditCardList = this.helperService.getCreditCardList()
     this.helperService.creditCardListChanged.subscribe((value)=>{
      this.creditCardList = value
     })
   }
}
