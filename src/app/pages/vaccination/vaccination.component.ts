import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vaccination',
  templateUrl: './vaccination.component.html',
  styleUrls: ['./vaccination.component.scss']
})
export class VaccinationComponent implements OnInit {

  navLinks: any[];

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.navLinks = this.router.config
      .filter(r => r.path === 'vaccination' && !!r.children)
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
