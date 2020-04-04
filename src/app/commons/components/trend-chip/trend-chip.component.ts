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

  // usually when values increase rapidly it's bad: invert logic if it's good
  @Input()
  inverseLogic: boolean;

  constructor() { }

  ngOnInit() {
  }

  getTrend(trend: Trend): string {
    switch (trend) {
      case Trend.MARKED_IMPROVEMENT:
        return this.inverseLogic ? 'bad' : 'good';
      case Trend.IMPROVEMENT:
        return this.inverseLogic ? 'bad-ish' : 'good-ish';
      case Trend.DETERIORATION:
        return this.inverseLogic ? 'good-ish' : 'bad-ish';
      case Trend.SHARP_DETERIORATION:
        return this.inverseLogic ? 'good' : 'bad';
      default:
        return 'bad';
    }
  }

  getTooltip(trend: Trend): string {
    switch (trend) {
      case Trend.MARKED_IMPROVEMENT:
        return 'Netto ' + (this.inverseLogic ? 'peggioramento' : 'miglioramento');
      case Trend.IMPROVEMENT:
        return (this.inverseLogic ? 'Peggioramento' : 'Miglioramento') + ' lieve';
      case Trend.DETERIORATION:
        return (this.inverseLogic ? 'Miglioramento' : 'Peggioramento') + ' lieve';
      case Trend.SHARP_DETERIORATION:
        return 'Netto ' + (this.inverseLogic ? 'miglioramento' : 'peggioramento');
      default:
        return 'bad';
    }
  }
}
