import { Component } from '@angular/core';
import {FormBuilder, FormControl } from '@angular/forms';
import { CreditCardMaskPipe } from './helpers/creditcard.pipe';

export const months = Array.from({length: 12}, (x, i) => i+1).map((value: number)=> {
  const valueStr = value.toString()
  return valueStr.length > 1 ? valueStr : `0${valueStr}`});
export const years = Array.from({length: 10}, (x, i) => i+22);
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [CreditCardMaskPipe]
})
export class AppComponent { 
  tabs = [{id:'CreditCard', name: 'Credit Card'}, {id:'BannedCountries', name:'Banned Countries' },{id: 'CreditCardList', name:'Credit Card List'} ];
  selected = new FormControl(0);
}
