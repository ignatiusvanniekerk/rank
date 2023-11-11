import { Injectable } from '@angular/core'
import { COUNTRY_LIST_BANED } from './country-code'
import { Subject } from 'rxjs'

@Injectable()
export class HelperService {
  public bannedCountryListCodesChanged: Subject<any> = new Subject<any>()
  public creditCardListChanged: Subject<any> = new Subject<any>()

  bannedCountryListCodes = []
  creditCardList: Array<any> = []
  constructor() {
    let BannedList = sessionStorage.getItem('banned-country-list-codes')
    let CClist = sessionStorage.getItem('credit-card-list')
    this.bannedCountryListCodes = BannedList ? JSON.parse(BannedList) : COUNTRY_LIST_BANED
    this.creditCardList = CClist ? JSON.parse(CClist) : []
  }


  setBannedList(value: any){
    this.bannedCountryListCodes = value
    this.bannedCountryListCodesChanged.next(this.bannedCountryListCodes)
    sessionStorage.setItem('banned-country-list-codes', JSON.stringify(value))
  }

  getBannedList(){
    return this.bannedCountryListCodes || JSON.parse(JSON.stringify(this.bannedCountryListCodes))
  }

  setCreditCardList(value: any){
    this.creditCardList.push(value)
    this.creditCardListChanged.next(this.creditCardList)
    sessionStorage.setItem('credit-card-list', JSON.stringify(this.creditCardList))
  }

  getCreditCardList(){
    return this.creditCardList
  }


}
