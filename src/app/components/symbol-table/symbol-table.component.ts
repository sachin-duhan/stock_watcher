import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PChange } from '../stock/stock.component';

@Component({
  selector: 'Symbol-table',
  templateUrl: './symbol-table.component.html',
  styleUrls: ['./symbol-table.component.css']
})
export class SymbolTableComponent {
  @Input() symbol!: string;
  @Input() attributes!: string[]
  @Input() data!: string[];
  @Input() bChange!: PChange;
  @Input() aChange!: PChange;

  @Output() remove = new EventEmitter<void>();


  bidClass(index: any): string {
    let _class = "";
    if(this.attributes[index] == 'Bid Price'){
      if(this.bChange == 'positive') _class = "text-success";
      else if(this.bChange == 'negetive') _class = "text-danger"
      else _class = "text-dark";
    }
    return _class;
  }

  askClass(index: any): string {
    let _class = "";
    if(this.attributes[index] == 'Ask Price'){
      if(this.aChange == 'positive') _class = "text-success";
      else if(this.aChange == 'negetive') _class = "text-danger"
      else _class = "text-dark";
    }
    return _class;
  }

  handleRemove(){
    this.remove.emit()
  }

  constructor() {}
}
