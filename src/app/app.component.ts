import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public allowed_symbols: string[] = ['BTCUSDT','BNBBTC','ETHUSDT','BTCETH','XRPETH','XLMETH','XLMUSDT'];
  public current_slist: string[] = ['btcusdt', 'ethusdt'];

  public inputSearch: string = "";
 
  handleSubmit(){
    if(this.allowed_symbols.indexOf(this.inputSearch.toUpperCase()) == -1) {
      alert("input symbol now allowed. Please use one of - " + "".concat(this.allowed_symbols.join(", ")))
      return;
    }

    if(this.current_slist.includes(this.inputSearch.toLowerCase())){
      return
    }

    this.current_slist.push(this.inputSearch.toLowerCase())
    this.inputSearch = "";
  }
}
