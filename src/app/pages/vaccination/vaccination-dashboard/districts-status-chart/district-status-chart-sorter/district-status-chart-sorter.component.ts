import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { VaccinationDistrictStatusSorter } from '../../../models/vaccination-district-status-sorter';

@Component({
  selector: 'app-district-status-chart-sorter',
  templateUrl: './district-status-chart-sorter.component.html',
  styleUrls: ['./district-status-chart-sorter.component.scss']
})
export class DistrictStatusChartSorterComponent implements OnInit {

  @Input()
  sorters: VaccinationDistrictStatusSorter[];

  @Input()
  selectedSorter: VaccinationDistrictStatusSorter;

  @Output()
  selectSorter: EventEmitter<VaccinationDistrictStatusSorter> = new EventEmitter<VaccinationDistrictStatusSorter>();

  constructor() { }

  ngOnInit(): void {
  }

  select(sorter: VaccinationDistrictStatusSorter): void {
    this.selectSorter.next(sorter);
  }
}
