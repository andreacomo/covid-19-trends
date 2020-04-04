import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-chip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ChipComponent implements OnInit {

  @Input()
  style: string;

  constructor() { }

  ngOnInit() {
  }
}
