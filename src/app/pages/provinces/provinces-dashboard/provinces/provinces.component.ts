import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { GithubService } from 'src/app/commons/services/github.service';
import { Observable } from 'rxjs';
import { Province } from '../../../../commons/models/province';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { ProvinceData } from 'src/app/commons/models/province-data';

@Component({
  selector: 'app-provinces',
  templateUrl: './provinces.component.html',
  styleUrls: ['./provinces.component.scss']
})
export class ProvincesComponent implements OnInit, OnChanges {

  @Input()
  district: string;

  @Output()
  clickItems: EventEmitter<ProvinceData[]> = new EventEmitter<ProvinceData[]>();

  provinces: (ProvinceData & {disabled: boolean})[];

  checkGroup: 'all' | 'none';

  constructor(private github: GithubService) { }

  ngOnInit() {
    this.checkGroup = 'all';
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.district.currentValue !== changes.district.previousValue) {
      this.ngOnInit();
      this.github.getProvincesOf(changes.district.currentValue)
        .subscribe(p => this.provinces = p as (ProvinceData & {disabled: boolean})[]);
    }
  }

  toggle(province: ProvinceData & {disabled: boolean}) {
    province.disabled = !province.disabled;
    this.calculateCheckGroup();
    this.clickItems.next([province]);
  }

  onCheckGroupChange(event: MatButtonToggleChange) {
    this.checkGroup = event.value;
    this.clickItems.next([...this.provinces]); // cloning will trigger changes in child components...
  }

  private calculateCheckGroup() {
    if (this.provinces.every(p => !p.disabled)) {
      this.checkGroup = 'all';
    } else if (this.provinces.every(p => p.disabled)) {
      this.checkGroup = 'none';
    } else {
      this.checkGroup = null;
    }
  }
}
