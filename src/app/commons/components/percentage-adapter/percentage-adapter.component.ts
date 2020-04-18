import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProvincePercentAdapter } from '../../models/province-percent-adapter';
import { LocalDataService } from '../../services/local-data.service';
import { map } from 'rxjs/operators';
import { ChartDataTypeDecorator } from '../../models/chart-data-type-decorator';

@Component({
  selector: 'app-percentage-adapter',
  templateUrl: './percentage-adapter.component.html',
  styleUrls: ['./percentage-adapter.component.scss']
})
export class PercentageAdapterComponent implements OnInit {

  @Output()
  selectAdapter: EventEmitter<ChartDataTypeDecorator> = new EventEmitter<ChartDataTypeDecorator>();

  private adapter: Promise<ChartDataTypeDecorator>;

  constructor(private localData: LocalDataService) { }

  ngOnInit() {
    this.adapter = this.localData.getProvincesPopulation()
      .pipe(
        map(pop => new ProvincePercentAdapter(pop))
      )
      .toPromise();
  }

  select(choice: string) {
    switch (choice) {
      case 'pop_percent':
        this.adapter.then(adapter => this.selectAdapter.next(adapter));
        break;
      default:
        this.selectAdapter.next();
    }
  }
}


