import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { getKeyFromSymbol, getSymbolValue, payload, TAttributes } from 'src/app/utils';

export type PChange = "positive" | 'negetive' | 'neutral';
@Component({
  selector: 'stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit, OnDestroy {
  @Input() symbol !: string

  public allowed_attributes: string[] = []
  public bidChange: PChange = 'neutral';
  public askChange: PChange = 'negetive';
  public data: string[] = Object.keys(payload).map(el => 'loading...');

  public parser = (res: any) => {
    const bidIdx = this.allowed_attributes.indexOf("Bid Price")
    const askIdx = this.allowed_attributes.indexOf("Ask Price")

    const _data = JSON.parse(res.data)
    const lBidPrice = parseFloat(this.data[bidIdx]) ?? 0
    const lAskPrice = parseFloat(this.data[askIdx]) ?? 0
    
    const isAsk = Boolean(_data['m'])
    _data['bp'] = !isAsk ? _data['p'] : lAskPrice;
    _data['ap'] = isAsk ? _data['p'] : lBidPrice;
    
    if(bidIdx !== -1 && !Number.isNaN(lBidPrice)){
      const cPrice = parseFloat(_data['bp'])
      if(cPrice == lBidPrice) {
        this.bidChange = 'neutral'
      } else if (cPrice < lBidPrice){
        this.bidChange = 'negetive'
      } else {
        this.bidChange = 'positive'
      }
    }

    if(askIdx !== -1 && !Number.isNaN(lAskPrice)){
      const cPrice = parseFloat(_data['ap'])
      if(cPrice == lBidPrice) {
        this.askChange = 'neutral'
      } else if (cPrice < lBidPrice){
        this.askChange = 'negetive'
      } else {
        this.askChange = 'positive'
      }
    }

    delete _data['p']
    delete _data['m']

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

  @Output() remove = new EventEmitter<string>();

  _remove(){
    this.remove.emit(this.symbol)
    this.ngOnDestroy()
  }
}
