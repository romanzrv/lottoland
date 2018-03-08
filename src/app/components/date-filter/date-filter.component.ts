import { Component, OnInit } from '@angular/core';
import { LottolandServiceService } from "../../services/lottoland-service.service";
import * as _ from 'lodash';

@Component({
  selector: 'app-date-filter',
  templateUrl: './date-filter.component.html',
  styleUrls: ['./date-filter.component.css']
})
export class DateFilterComponent implements OnInit {
  private receivedData: Array<any>;
  private selectedDayMonth: string;
  private selectedYear: string;
  private years: Array<string>;
  private dayMonth: Array<{}>;
  private title: string;


  constructor(private lottolandService: LottolandServiceService) {
    this.title = 'EuroJackpot Results & Winning Numbers';
  }

  /**
   * This method gets unique years
   * @param data - Data retrieved from the API
   * @returns {Array<string>}
   */
  public getYears = (data) => {
    const filteredYears: Array<any> = [];
    let yearsSelected: Array<string>;

    _.forEach(data, (value, key) => {
      filteredYears.push({year: value.date.year});
    });

    yearsSelected = _.uniq(_.map(filteredYears, 'year'));
    this.years = yearsSelected;
  }

  /**
   * This method parse the dates and get a day-month string
   * @param data - The data to draw
   * @param year - Selected year
   */
  public getDayMonth = (data, year) => {
    const yearMonths = {0: 'Jan', 1: 'Feb', 2: 'Mar', 3: 'Abr', 4: 'May', 5: 'Jun', 6: 'Jul', 7: 'Aug', 8: 'Sep', 9: 'Oct', 10: 'Nov', 11: 'Dec'};
    const weekDays = {0: 'Mon', 1: 'Tue', 2: 'Wed', 3: 'Thu', 4: 'Fri', 5: 'Sat', 6: 'Sun'};
    let filteredDates: Array<string>;
    const dayMonth: Array<{}> = [];

    filteredDates = _.filter(data, (d) => {
      return d.date.year.toString() === year;
    });

    _.forEach(filteredDates, (value, key) => {
      const date = new Date(`${value.date.month}.${value.date.day}.${year}`);
      const literal = `${weekDays[date.getDay()]} ${value.date.day} ${yearMonths[date.getMonth()]}`;
      dayMonth.push({dayMonth: `${value.date.day}.${value.date.month}`, string: literal});
    });

    this.dayMonth = dayMonth;
  }

  /**
   * This method fills the year combo with the parsed values
   */
  public fillYearCombo = () => {
    this.getYears(this.receivedData);
  }

  /**
   * This methdd fills the day-month combo with the parsed values
   */
  public fillDayMonthCombo = () => {
    this.getDayMonth(this.receivedData, this.selectedYear);
  }

  ngOnInit() {
    this.lottolandService.requestAjaxData();
    this.lottolandService.getReceivedData().subscribe(data => {
      this.receivedData = data;
      this.fillYearCombo();
    });
  }

}
