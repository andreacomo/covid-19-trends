import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Regulation } from 'src/app/commons/models/districts-lockdown-colors';

@Component({
  selector: 'app-regulation-date-selection',
  templateUrl: './regulation-date-selection.component.html',
  styleUrls: ['./regulation-date-selection.component.scss']
})
export class RegulationDateSelectionComponent implements OnInit {

  @Input()
  regulations: Regulation[];

  reversedRegulations: Regulation[];

  @Output()
  dateChange: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
    this.reversedRegulations = [...this.regulations].reverse();
  }

  onTabChange(changeEvent: MatTabChangeEvent) {
    this.dateChange.emit(this.regulations.length - 1 - changeEvent.index);
  }

}
