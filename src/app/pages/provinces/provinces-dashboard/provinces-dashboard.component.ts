import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Province } from 'src/app/commons/models/province';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-provinces-dashboard',
  templateUrl: './provinces-dashboard.component.html',
  styleUrls: ['./provinces-dashboard.component.scss']
})
export class ProvincesDashboardComponent implements OnInit {

  selectedDistrict: string;

  selectedProvinces: Province[];

  constructor(private router: ActivatedRoute) { }

  ngOnInit() {
    this.selectedDistrict = this.router.snapshot.queryParamMap.get('district');
  }

  districtChanged(event: string) {
    this.selectedDistrict = event;
  }

  provinceClicked(event: Province[]) {
    this.selectedProvinces = event;
  }
}
