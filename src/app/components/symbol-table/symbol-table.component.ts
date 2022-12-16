import { Component, Input } from '@angular/core';
import { TradeData } from 'src/app/utils';

@Component({
  selector: 'Symbol-table',
  templateUrl: './symbol-table.component.html',
  styleUrls: ['./symbol-table.component.css']
})
export class SymbolTableComponent {
  @Input() symbol!: string;
  @Input() attributes!: string[]
  @Input() data!: string[];
  @Input() change!: 'positive' | 'negetive' | 'neutral';

  priceClass(index: any): string {
    let _class = "";
    if(this.attributes[index] == 'Price'){
      if(this.change == 'positive') _class = "text-success";
      else if(this.change == 'negetive') _class = "text-danger"
      else _class = "text-dark";
    }
    return _class;
  }

  constructor() {}
}
