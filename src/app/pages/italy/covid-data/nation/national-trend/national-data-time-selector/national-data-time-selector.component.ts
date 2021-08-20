import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-national-data-time-selector',
  templateUrl: './national-data-time-selector.component.html',
  styleUrls: ['./national-data-time-selector.component.scss']
})
export class NationalDataTimeSelectorComponent implements OnInit, OnChanges {

  @Input()
  selectedMonths: number;

  @Input()
  availableTimeFrames: NationalTimeFrame[];

  @Output()
  selectedTimeFrame: EventEmitter<number> = new EventEmitter<number>();

  selectedLabel: string;

  constructor() {
    this.availableTimeFrames = [{
      months: 2,
      label: '2 mesi',
      isSvg: false,
      icon: ''
    }, {
      months: 3,
      label: '3 mesi',
      isSvg: false,
      icon: ''
    }, {
      months: 4,
      label: '4 mesi',
      isSvg: false,
      icon: ''
    }, {
      months: 5,
      label: '5 mesi',
      isSvg: false,
      icon: ''
    }, {
      months: 6,
      label: '6 mesi',
      isSvg: false,
      icon: ''
    }, {
      months: 8,
      label: '8 mesi',
      isSvg: false,
      icon: ''
    }, {
      months: 10,
      label: '10 mesi',
      isSvg: false,
      icon: ''
    }, {
      months: 12,
      label: '12 mesi',
      isSvg: false,
      icon: ''
    }];
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectedMonths.currentValue) {
      const found = this.availableTimeFrames.filter(tf => tf.months === this.selectedMonths);
      if (found.length) {
        this.selectedLabel = found[0].label;
      } else {
        throw new Error('selectedMonths value not supported!');
      }
    }
  }

  select(value: NationalTimeFrame) {
    this.selectedTimeFrame.next(value.months);
  }

}

class NationalTimeFrame {

  months: number;

  label: string;

  isSvg: boolean;

  icon: string;
}
