import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit, Input } from '@angular/core';

@Component({
  selector: 'app-line-chart-stroke',
  templateUrl: './line-chart-stroke.component.html',
  styleUrls: ['./line-chart-stroke.component.scss']
})
export class LineChartStrokeComponent implements OnInit, AfterViewInit {

  @Input()
  lineDash: number[];

  @ViewChild('line', {static: true})
  canvas: ElementRef;

  @Input()
  sizeOf: HTMLElement;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    const width = this.sizeOf != null ? this.sizeOf.clientWidth : 24;
    const height = this.sizeOf != null ? this.sizeOf.clientHeight : 24;
    this.canvas.nativeElement.width = width;
    this.canvas.nativeElement.height = height;

    const context: CanvasRenderingContext2D = this.canvas.nativeElement.getContext('2d');
    context.beginPath();
    context.setLineDash(this.lineDash);
    context.moveTo(20, height / 4);
    context.lineTo(width - 10, height / 4);
    context.strokeStyle = '#E18602';
    context.lineWidth = 2;
    context.stroke();
  }

}
