import { Component, OnInit } from '@angular/core';
import { DpcCovid19Service } from 'src/app/commons/services/dpc-covid19.service';
import { DistrictData } from 'src/app/commons/models/district-data';
import { NationalData } from 'src/app/commons/models/national-data';

@Component({
  selector: 'app-home-dashboard',
  templateUrl: './home-dashboard.component.html',
  styleUrls: ['./home-dashboard.component.scss']
})
export class HomeDashboardComponent implements OnInit {

  allDistrictsData: {[name: string]: DistrictData[]};

  allNationalData: NationalData[];

  constructor(private github: DpcCovid19Service) { }

  ngOnInit() {
    this.github.getAllDistrictsData()
      .subscribe(data => {
        this.allDistrictsData = data;
      });

    this.github.getAllNationalData()
    .subscribe(data => {
      this.allNationalData = data;
    });
  }

}
