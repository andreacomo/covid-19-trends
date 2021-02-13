import { Component, OnInit } from '@angular/core';
import { DpcCovid19Service } from 'src/app/commons/services/dpc-covid19.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  updateDate: Date;

  constructor(private github: DpcCovid19Service) { }

  ngOnInit() {
    this.github.getLatestNational()
    .subscribe(data => {
      this.updateDate = new Date(data.data);
    });
  }

}
