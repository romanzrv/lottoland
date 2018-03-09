import { Component, OnInit } from '@angular/core';
import { LottolandServiceService } from "../../services/lottoland-service.service";

@Component({
  selector: 'app-result-numbers',
  templateUrl: './result-numbers.component.html',
  styleUrls: ['./result-numbers.component.css']
})
export class ResultNumbersComponent implements OnInit {
  public euroNumbers: Array<any> = [];
  public numbers: Array<any> = [];

  constructor(private lottolandService: LottolandServiceService) { }

  ngOnInit() {
    this.lottolandService.getRowData().subscribe(data => {
      if (data && data.length > 0) {
        this.euroNumbers = data[0].euroNumbers;
        this.numbers = data[0].numbers;
      }
    });
  }

}
