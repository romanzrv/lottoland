import { Component, OnInit } from '@angular/core';
import { LottolandServiceService } from "../../services/lottoland-service.service";

@Component({
  selector: 'app-date-filter',
  templateUrl: './date-filter.component.html',
  styleUrls: ['./date-filter.component.css']
})
export class DateFilterComponent implements OnInit {
  private receivedData: Array<any>;

  constructor(private lottolandService: LottolandServiceService) { }

  ngOnInit() {
    this.lottolandService.requestAjaxData();
    this.lottolandService.getReceivedData().subscribe(data => {
      this.receivedData = data;
    });
  }

}
