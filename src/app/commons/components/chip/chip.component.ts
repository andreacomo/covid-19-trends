import { Component, OnInit, Input } from '@angular/core';
import { Trend } from 'src/app/pages/home/models/trend';

@Component({
  selector: 'app-chip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.scss']
})
export class ChipComponent implements OnInit {

  @Input()
  style: string;

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

}
