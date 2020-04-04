import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { Trend } from 'src/app/pages/home/models/trend';

@Component({
  selector: 'app-trend-chip',
  templateUrl: './trend-chip.component.html',
  styleUrls: ['./trend-chip.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TrendChipComponent implements OnInit {

  @Input()
  trend: Trend;

  constructor() { }

  ngOnInit() {
  }

  getTrend(trend: Trend): string {
    switch (trend) {
      case Trend.MARKED_IMPROVEMENT:
        return 'good';
      case Trend.IMPROVEMENT:
        return 'good-ish';
      case Trend.DETERIORATION:
        return 'bad-ish';
      case Trend.SHARP_DETERIORATION:
        return 'bad';
      default:
        return 'bad';
    }
  }

  getTooltip(trend: Trend): string {
    switch (trend) {
      case Trend.MARKED_IMPROVEMENT:
        return 'Netto miglioramento';
      case Trend.IMPROVEMENT:
        return 'Miglioramento lieve';
      case Trend.DETERIORATION:
        return 'Peggioramento lieve';
      case Trend.SHARP_DETERIORATION:
        return 'Netto peggioramento';
      default:
        return 'bad';
    }
  }
}
