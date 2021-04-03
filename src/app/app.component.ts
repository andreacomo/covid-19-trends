import { Component, OnInit, SimpleChanges } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { environment } from '../environments/environment';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { GoogeAnalyticsService } from './commons/services/googe-analytics.service';
import { SimpleRouteInfo as SimpleRouteChanges } from './commons/models/simple-route-changes';
import { Observable } from 'rxjs';

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
              private titleService: Title,
              private googleAnalyticsService: GoogeAnalyticsService) {
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

    this.emitSimpleRouteChanges()
      .subscribe((routeInfo: SimpleRouteChanges) => {
        this.titleService.setTitle(routeInfo.title);

        this.googleAnalyticsService.emitPageChange(routeInfo);
      });
  }

  // https://blog.bitsrc.io/dynamic-page-titles-in-angular-98ce20b5c334
  // https://medium.com/madhash/how-to-properly-add-google-analytics-tracking-to-your-angular-web-app-bc7750713c9e
  private emitSimpleRouteChanges(): Observable<SimpleRouteChanges> {
    const appTitle = this.titleService.getTitle();
    return this.router
      .events.pipe(
        filter(event => event instanceof NavigationEnd),
        map((event: NavigationEnd) => {
          let child = this.activatedRoute.firstChild;
          while (child.firstChild) {
            child = child.firstChild;
          }

          if (child.snapshot.data.title) {
            return {
              title: child.snapshot.data.title,
              path: event.urlAfterRedirects
            } as SimpleRouteChanges;
          }
          return {
            title: appTitle,
            path: event.urlAfterRedirects
          } as SimpleRouteChanges;
        })
      );
  }
}
