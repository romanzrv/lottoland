import { Component, OnInit} from '@angular/core';
import { LottolandServiceService } from '../../services/lottoland-service.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-date-filter',
  templateUrl: './date-filter.component.html',
  styleUrls: ['./date-filter.component.css']
})
export class DateFilterComponent implements OnInit {
  public receivedData: Array<any>;
  public selectedDayMonth: any;
  public selectedYear: string;
  public years: Array<string>;
  public dayMonth: Array<{}>;
  public title: string;


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
    this.selectedYear = this.years[0];
    this.lottolandService.setSelectedYear(this.selectedYear);
  }

  /**
   * This method parse the dates and get a day-month string
   * @param data - The data to draw
   * @param year - Selected year
   */
  public getDayMonth = (data, year) => {
    let filteredDates: Array<string>;
    const dayMonth: Array<{}> = [];

    filteredDates = _.filter(data, (d) => {
      return d.date.year.toString() === year.toString();
    });

    _.forEach(filteredDates, (value, key) => {
      const literal = this.lottolandService.getLiteralFromDate(value);
      dayMonth.push({dayMonth: `${value.date.day}.${value.date.month}`, string: literal});
    });

    this.dayMonth = dayMonth;
    this.selectedDayMonth = this.dayMonth[0]['dayMonth'];
  }

  /**
   * This method parse the data to draw filtering by the selected date
   * (Also trimming the zeros from date)
   * @param date - The date selected in the combo
   * @param data - received data
   */
  public setDataToDrawByDate = (event, data) => {
    let date = event ? `${event.value}.${this.selectedYear}` : data;
    const rowsToDraw = _.filter(this.receivedData, (d) => {return _.split(d.drawingDate, ',', 1)[0].replace(/\b0/g, '') === date});
    this.lottolandService.setRowData(rowsToDraw);

    console.log(date);
    console.log(rowsToDraw);
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
    this.setDataToDrawByDate(null, `${this.selectedDayMonth}.${this.selectedYear}`);
  }

  /**
   * On first load, set the most recent date as default and load data
   */
  ngOnInit() {
    this.lottolandService.requestAjaxData();

    this.lottolandService.getReceivedData().subscribe(data => {
      this.receivedData = data;
      this.fillYearCombo();
    });

    this.lottolandService.getSelectedYear().subscribe(data => {
      if (data) {
        let selectedDate = `${this.selectedDayMonth}.${this.selectedYear}`;
        this.fillDayMonthCombo();
        this.setDataToDrawByDate(null, selectedDate);
      }
    });

  }

}
