import { Component, OnInit } from '@angular/core';
import { LottolandServiceService } from '../../services/lottoland-service.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-result-table',
  templateUrl: './result-table.component.html',
  styleUrls: ['./result-table.component.css']
})
export class ResultTableComponent implements OnInit {
  public romanNumbers: {};
  public matches: {};
  public titles: any;
  public dataToDraw: any;

  constructor(private lottolandService: LottolandServiceService) {
    this.romanNumbers = { 1: 'I', 2: 'II', 3: 'III', 4: 'IV', 5: 'V', 6: 'VI', 7: 'VII', 8: 'VIII', 9: 'IX', 10: 'X', 11: 'XI', 12: 'XII' };
    this.titles = {tier: 'Tier', match: 'Match', winners: 'Winners', amount: 'Amount'};
    this.matches = {
      1: {n: 5, e: 2}, 2: {n: 5, e: 1}, 3: {n: 5, e: 0}, 4: {n: 4, e: 2}, 5: {n: 4, e: 1}, 6: {n: 4, e: 0}, 7: {n: 3, e: 2},
      8: {n: 2, e: 2}, 9: {n: 3, e: 1}, 10: {n: 3, e: 0}, 11: {n: 1, e: 2}, 12: {n: 2, e: 1}
    };
  }

  /**
   * Parse the prize amount with commas
   * @param value
   * @returns {string}
   */
  public parsePrizeNumber = (value): string => {
    return value.toString().replace(/\D/g, "")
      .replace(/([0-9])([0-9]{2})$/, '$1.$2')
      .replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ",");
  }

  /**
   * Parse the winners number with commas
   * @param value
   * @returns {string}
   */
  public parseWinnersNumbers = (value): string => {
    return value.toLocaleString('en');
  }

  /**
   * Order and parse the received data
   * @param dataToParse - Received data
   */
  public parseAndDrawInfo = (dataToParse) => {
    this.dataToDraw = _.values(dataToParse[0].odds);
    this.dataToDraw = _.orderBy(this.dataToDraw, ['prize'], ['desc']);
    this.dataToDraw = _.filter(this.dataToDraw, (d) => {return d.prize !== 0});
  }

  /**
   * On first load, draw the table
   */
  ngOnInit() {
    this.lottolandService.getRowData().subscribe(data => {
      if (data && data.length > 0)
        this.parseAndDrawInfo(data);
    });
  }

}
