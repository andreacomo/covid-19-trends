import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'covid';

  navLinks: any[];

  constructor(private matIconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer,
              private router: Router) {
    this.matIconRegistry.addSvgIcon(
      'github',
      this.domSanitizer.bypassSecurityTrustResourceUrl(environment.context + 'assets/github.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'percent',
      this.domSanitizer.bypassSecurityTrustResourceUrl(environment.context + 'assets/percent.svg')
    );
  }

  ngOnInit(): void {
    this.navLinks = this.router.config
      .filter(r => r.data && r.data.label)
      .map(r => {
        return {
          path: r.path,
          label: r.data.label
        };
      });
  }

}
