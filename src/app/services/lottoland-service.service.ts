import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";

@Injectable()
export class LottolandServiceService {
  public url: string;

  private receivedData = new BehaviorSubject<any>([]);
  private tableRowData = new BehaviorSubject<any>([]);
  private selectedYearData = new BehaviorSubject<any>([]);

  constructor(public http: HttpClient) {
    this.url = 'https://media.lottoland.com/api/drawings/euroJackpot/1462515960';
  }

  /**
   * This method gets the data via AJAX
   * @returns {Observable<any>}
   */
  public sendAjaxRequest(): Observable<any> {
    let receivedData = this.http.get(this.url);
    return receivedData;
  }

  /**
   * This method stores the received data
   */
  public requestAjaxData = () => {
    this.sendAjaxRequest().subscribe(data => {
      if (data)
        this.setReceivedData(data.last)
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
   * @param dataToSet
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
   * @param dataToSet
   */
  public setRowData = (dataToSet: any) => {
    this.tableRowData.next(dataToSet);
  }


  /**
   * Default selected year getter
   * @param dataToSet
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

}
