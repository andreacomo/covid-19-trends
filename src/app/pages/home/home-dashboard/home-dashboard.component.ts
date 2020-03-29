import { Component, OnInit } from '@angular/core';
import { GithubService } from 'src/app/commons/services/github.service';
import { DistrictData } from 'src/app/commons/models/district-data';

@Component({
  selector: 'app-home-dashboard',
  templateUrl: './home-dashboard.component.html',
  styleUrls: ['./home-dashboard.component.scss']
})
export class HomeDashboardComponent implements OnInit {

  data: {[name: string]: DistrictData[]};

  constructor(private github: GithubService) { }

  ngOnInit() {
    this.github.getAllDistrictsData()
      .subscribe(data => {
        this.data = data;
      });
  }

}
