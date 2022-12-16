import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SymbolTableComponent } from './components/symbol-table/symbol-table.component';
import { StockComponent } from './components/stock/stock.component';

@NgModule({
  declarations: [
    AppComponent,
    SymbolTableComponent,
    StockComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
