import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { WorldVaccinationMetric } from '../../models/world-vaccination-metric';

@Component({
  selector: 'app-vaccination-metric-selector',
  templateUrl: './vaccination-metric-selector.component.html',
  styleUrls: ['./vaccination-metric-selector.component.scss']
})
export class VaccinationMetricSelectorComponent implements OnInit, OnChanges {

  @Input()
  selected: WorldVaccinationMetric;

  @Input()
  availableMetrics: WorldVaccinationMetric[];

  @Output()
  selectedMetric: EventEmitter<WorldVaccinationMetric> = new EventEmitter<WorldVaccinationMetric>();

  selectedLabel: string;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selected.currentValue) {
      this.selectedLabel = this.selected.label;
    }
  }

  select(value: WorldVaccinationMetric) {
    this.selectedMetric.next(value);
  }
}
