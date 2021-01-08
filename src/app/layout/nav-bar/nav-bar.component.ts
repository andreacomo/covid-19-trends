import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  @Output()
  closeMenu: EventEmitter<any> = new EventEmitter<any>();

  menu: MenuItem[];

  constructor() {
    this.menu = [{
        links: [{
          label: 'Home',
          path: '/home'
        }]
      }, {
      // groupName: 'Italia',
      links: [{
        label: 'Dati COVID-19',
        path: '/italy'
      }, {
        label: 'Vaccinazione',
        path: '/vaccination'
      }]
    }];
  }

  ngOnInit(): void {
  }

  doCloseMenu() {
    this.closeMenu.next();
  }

}

class MenuItem {

  groupName?: string;

  links: Link[];
}

class Link {

  label: string;

  path: string;
}
