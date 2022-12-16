import { Component, OnDestroy, OnInit } from '@angular/core';
import { getKeyFromSymbol, getSymbolValue, payload, TAttributes, TradeData, WS_URL } from './utils';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{

  public inputSearch: string = ""
  public table_attributes = Object.keys(payload).map(key => {
    return {
      checked: true,
      key,
      dVal: getSymbolValue(key as TAttributes) 
    }
  });

  public priceChange: 'positive' | 'negetive' | 'neutral' = 'neutral';

  public data: string[] = [];
  public allowed_attributes: string[] = []

  public setAllowAttr() {
    this.allowed_attributes = this.table_attributes.filter(el => el.checked).map(el => el.dVal)
  }

  public parser = (res: any) => {
    const pIndex = this.allowed_attributes.indexOf('Price');
    const _data = JSON.parse(res.data)

    const lPrice = parseFloat(this.data[pIndex])
    if(pIndex !== -1 && !Number.isNaN(lPrice)){
      const cPrice = parseFloat(_data['p'])
      if(cPrice == lPrice) {
        this.priceChange = 'neutral'
      } else if (cPrice < lPrice){
        this.priceChange = 'negetive'
      } else {
        this.priceChange = 'positive'
      }
      console.log(cPrice, lPrice)
    }

    this.data = []
    this.allowed_attributes.forEach(key => {
      this.data.push(_data[getKeyFromSymbol(key)])
    })

    console.log(_data)
  }

  public wsConnection!: any
  constructor(){
    this.wsConnection = new WebSocket(WS_URL, []).addEventListener('message', this.parser);
  }

  ngOnDestroy(): void {
    if(this.wsConnection){
      // this.wsConnection.close()
    }
  }
  
  ngOnInit(): void {
    this.setAllowAttr()
  }
  
  handleClick(state: boolean, index: number)  {
    this.table_attributes[index].checked = state;
    if(state == false) {
      this.data.splice(index, 1)
    } else {
      this.data.splice(index, 0, "")
    }
    this.setAllowAttr()
  }
}
