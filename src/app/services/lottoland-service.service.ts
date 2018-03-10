import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class LottolandServiceService {
  public url: string;

  private receivedData = new BehaviorSubject<any>([]);
  private tableRowData = new BehaviorSubject<any>([]);
  private selectedYearData = new BehaviorSubject<any>([]);

  constructor(public http: HttpClient) {
    this.url = 'https://media.lottoland.com/api/drawings/euroJackpot/1462515962?callback=JSONP_CALLBACK';
  }

  /**
   * This method gets the data via AJAX
   * @returns {Observable<any>}
   */
  public sendAjaxRequest(): Observable<any> {
    const receivedData = this.http.jsonp(this.url, 'callback');
    return receivedData;
  }

  /**
   * This method stores the received data
   */
  public requestAjaxData = () => {
    this.sendAjaxRequest().subscribe(data => {
      if (data) {
        this.setReceivedData(data.last);
      }

    });
  }

  /**
   * Received data getter
   * @returns {BehaviorSubject<any>}
   */
  public getReceivedData = (): BehaviorSubject<any> => {
    return this.receivedData;
  }

  /**
   * Received data setter
   * @param dataToSet - Data to set
   */
  public setReceivedData = (dataToSet) => {
    this.receivedData.next(dataToSet);
  }

  /**
   * Row data getter
   * @returns {BehaviorSubject<any>}
   */
  public getRowData = (): BehaviorSubject<any> => {
    return this.tableRowData;
  }

  /**
   * Row data setter
   * @param dataToSet - Data to set
   */
  public setRowData = (dataToSet: any) => {
    this.tableRowData.next(dataToSet);
  }


  /**
   * Default selected year getter
   * @param dataToSet - Data to set
   */
  public setSelectedYear = (dataToSet: any) => {
    this.selectedYearData.next(dataToSet);
  }

  /**
   * Default selected year setter
   * @returns {BehaviorSubject<any>}
   */
  public getSelectedYear = (): BehaviorSubject<any> => {
    return this.selectedYearData;
  }

  /**
   * This method gets a literal from date
   * @param date - date to parse
   * @returns {string}
   */
  public getLiteralFromDate = (date): string => {
    const yearMonths = {0: 'Jan', 1: 'Feb', 2: 'Mar', 3: 'Abr', 4: 'May', 5: 'Jun', 6: 'Jul', 7: 'Aug', 8: 'Sep', 9: 'Oct', 10: 'Nov', 11: 'Dec'};
    const weekDays = {1: 'Mon', 2: 'Tue', 3: 'Wed', 4: 'Thu', 5: 'Fri', 6: 'Sat', 7: 'Sun'};

    const dateObj = new Date(`${date.date.month}.${date.date.day}.${date.date.year}`);
    const literal = `${weekDays[dateObj.getDay()]} ${date.date.day} ${yearMonths[dateObj.getMonth()]}`;

    return literal;
  }

}
