import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { environment } from '../environments/environment';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';

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
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private titleService: Title) {
    [
      {
        iconName: 'github',
        path: 'assets/github.svg'
      },
      {
        iconName: 'percent',
        path: 'assets/percent.svg'
      },
      {
        iconName: 'delta',
        path: 'assets/delta.svg'
      }
    ]
    .forEach(svg => {
      this.matIconRegistry.addSvgIcon(
        svg.iconName,
        this.domSanitizer.bypassSecurityTrustResourceUrl(environment.context + svg.path)
      );
    });
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

    // https://blog.bitsrc.io/dynamic-page-titles-in-angular-98ce20b5c334
    const appTitle = this.titleService.getTitle();
    this.router
      .events.pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => {
          let child = this.activatedRoute.firstChild;
          while (child.firstChild) {
            child = child.firstChild;
          }
          if (child.snapshot.data.title) {
            return child.snapshot.data.title;
          }
          return appTitle;
        })
      ).subscribe((ttl: string) => {
        this.titleService.setTitle(ttl);
    });
}

}
