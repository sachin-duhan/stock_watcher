import { Component, OnInit } from '@angular/core';
import { BASE_URL, getSymbolValue, payload, TAttributes } from './utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  public current_slist: string[] = ['btcusdt', 'ethusdt'];
  public filtered_symbol_list :string[] = this.current_slist
  public symbolQuery: string = "";

  handleFilterChange(){
    if(!this.symbolQuery.length){
      this.filtered_symbol_list = this.current_slist;
      return;
    }
    this.filtered_symbol_list = []
    this.filtered_symbol_list = this.current_slist.filter(el => el.includes(this.symbolQuery))
  }

  public inputSearch: string = "";
 
  public table_attributes = Object.keys(payload).map(key => {
    return {
      checked: true,
      key,
      dVal: getSymbolValue(key as TAttributes) 
    }
  });

  ngOnInit(){ }

  handleSubmit(){
    if(this.inputSearch.length === 0){
      alert("No valid input entered, please check.");
      return;
    }

    if(this.current_slist.includes(this.inputSearch.toLowerCase())){
      alert("symbol already added...")
      return
    }

    this.current_slist.push(this.inputSearch.toLowerCase())
    this.inputSearch = "";
  }

  removeSymbol(index: number){
    const fIdx = this.filtered_symbol_list.findIndex(el => el == this.current_slist[index])
    this.filtered_symbol_list.splice(fIdx, 1)
    this.current_slist.splice(index, 1);
  }
}
