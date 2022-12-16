import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { getKeyFromSymbol, getSymbolValue, payload, TAttributes } from 'src/app/utils';

@Component({
  selector: 'stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit, OnDestroy {
  @Input() symbol !: string

  public allowed_attributes: string[] = []
  public priceChange: 'positive' | 'negetive' | 'neutral' = 'neutral';
  public data: string[] = [];

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
    }

    this.data = []
    this.allowed_attributes.forEach(key => {
      this.data.push(_data[getKeyFromSymbol(key)])
    })
  }

  public wsConnection!: any

  constructor(){}

  ngOnDestroy(): void {
    if(this.wsConnection){
      this.wsConnection.close()
    }
  }
 
  public table_attributes = Object.keys(payload).map(key => {
    return {
      checked: true,
      key,
      dVal: getSymbolValue(key as TAttributes) 
    }
  });

  ngOnInit(): void {
    this.wsConnection = new WebSocket(`wss://stream.binance.com:9443/ws/${this.symbol.toLowerCase()}@trade`).addEventListener('message', this.parser);
    this.setAllowAttr()
  }

  public setAllowAttr() {
    this.allowed_attributes = this.table_attributes.filter(el => el.checked).map(el => el.dVal)
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
  @Output() remove = new EventEmitter<void>();

  _remove(){
    this.remove.emit()
    this.ngOnDestroy()
  }
}
