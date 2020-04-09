import { Component, OnInit } from '@angular/core';
import { NationalData } from 'src/app/commons/models/national-data';
import { GithubService } from 'src/app/commons/services/github.service';

@Component({
  selector: 'app-national-trend',
  templateUrl: './national-trend.component.html',
  styleUrls: ['./national-trend.component.scss']
})
export class NationalTrendComponent implements OnInit {

  allNationalData: NationalData[];

  constructor(private github: GithubService) { }

  ngOnInit() {
    this.github.getAllNationalData()
      .subscribe(data => {
        this.allNationalData = data;
      });
  }
}
