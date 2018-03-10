import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { DateFilterComponent } from './components/date-filter/date-filter.component';
import { ResultNumbersComponent } from './components/result-numbers/result-numbers.component';
import { ResultTableComponent } from './components/result-table/result-table.component';
import { LottolandServiceService } from "./services/lottoland-service.service";
import {HttpClientJsonpModule, HttpClientModule} from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    DateFilterComponent,
    ResultNumbersComponent,
    ResultTableComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    HttpClientJsonpModule
  ],
  providers: [LottolandServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
