import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-italian-vaccination-dashboard',
  templateUrl: './italian-vaccination-dashboard.component.html',
  styleUrls: ['./italian-vaccination-dashboard.component.scss']
})
export class ItalianVaccinationDashboardComponent implements OnInit {

  navLinks: any[];

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.navLinks = this.router.config
      .filter(r => r.path === 'vaccination' && !!r.children)
      .flatMap(r => r.children)
      .filter(r => r.path === 'italy' && !!r.children)
      .flatMap(r => r.children)
      .filter(r => r.data?.label)
      .map(r => {
        return {
          path: r.path,
          label: r.data.label
        };
      });
  }

}
