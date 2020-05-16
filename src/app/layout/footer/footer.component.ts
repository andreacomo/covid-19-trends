import { Component, OnInit } from '@angular/core';
import { GithubService } from 'src/app/commons/services/github.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  updateDate: Date;

  constructor(private github: GithubService) { }

  ngOnInit() {
    this.github.getLatestNational()
    .subscribe(data => {
      this.updateDate = new Date(data.data);
    });
  }

}
