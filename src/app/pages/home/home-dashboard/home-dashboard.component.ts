import { Component, OnInit } from '@angular/core';
import { GithubService } from 'src/app/commons/services/github.service';
import { DistrictData } from 'src/app/commons/models/district-data';
import { NationalData } from 'src/app/commons/models/national-data';

@Component({
  selector: 'app-home-dashboard',
  templateUrl: './home-dashboard.component.html',
  styleUrls: ['./home-dashboard.component.scss']
})
export class HomeDashboardComponent implements OnInit {

  allDistrictsData: {[name: string]: DistrictData[]};

  latestNational: NationalData;

  constructor(private github: GithubService) { }

  ngOnInit() {
    this.github.getAllDistrictsData()
      .subscribe(data => {
        this.allDistrictsData = data;
      });

    this.github.getLatestNational()
      .subscribe(data => {
        this.latestNational = data;
      });
  }

}
