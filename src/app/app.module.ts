import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { DateFilterComponent } from './components/date-filter/date-filter.component';
import { ResultNumbersComponent } from './components/result-numbers/result-numbers.component';
import { ResultTableComponent } from './components/result-table/result-table.component';


@NgModule({
  declarations: [
    AppComponent,
    DateFilterComponent,
    ResultNumbersComponent,
    ResultTableComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
