import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-districts-category-groups-chart',
  templateUrl: './districts-category-groups-chart.component.html',
  styleUrls: ['./districts-category-groups-chart.component.scss']
})
export class DistrictsCategoryGroupsChartComponent implements OnInit, OnChanges {

  @Input()
  data: any[];

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data.currentValue && !changes.data.previousValue) {
      console.log(this.data);
    }
  }
}
