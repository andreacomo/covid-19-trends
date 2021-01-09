import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-italy',
  templateUrl: './italy.component.html',
  styleUrls: ['./italy.component.scss']
})
export class ItalyComponent implements OnInit {

  navLinks: any[];

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.navLinks = this.router.config
      .filter(r => r.path === 'italy')
      .flatMap(r => r.children)
      .map(r => {
        return {
          path: r.path,
          label: r.data.label
        };
      });
  }

}
