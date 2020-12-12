import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Regulation } from 'src/app/commons/models/districts-lockdown-colors';

@Component({
  selector: 'app-regulation-date-selection',
  templateUrl: './regulation-date-selection.component.html',
  styleUrls: ['./regulation-date-selection.component.scss']
})
export class RegulationDateSelectionComponent implements OnInit {

  @Input()
  regulations: Regulation[];

  @Output()
  dateChange: EventEmitter<number> = new EventEmitter<number>();

  value: number;

  maxValue: number;

  constructor() { }

  ngOnInit() {
    this.maxValue = this.regulations.length - 1;
    this.value = this.maxValue;
  }

  onValueChange() {
    this.dateChange.emit(this.value);
  }

}
