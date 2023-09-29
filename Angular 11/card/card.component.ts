import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export enum ProgressColors {
  TEAL,
  ORANGE,
  PRIMARY_BLUE,
  VOILET
}

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() title: string;
  @Input() actionLabel: string;
  @Input() fullHeight: boolean;
  @Input() noTitle: boolean;
  @Input() isLoading: boolean;
  @Input() withProgress: boolean;
  @Input() progressPercentage: number = 100
  @Input() progressColor: ProgressColors;
  @Input() withProgressBorder;
  @Input() borderPosition: string = 'bottom'
  @Input() disabled: boolean;
  @Output() action = new EventEmitter<string>();


  onAction(value: string) {
    this.action.emit(value);
  }

  constructor() { }

  ngOnInit(): void {
  }

  getClass() {
    const borderColorClass = this.withProgressBorder ? `withBorderColor ${this.borderPosition} ${this.progressColor}` : ''
    const progressClass = this.withProgress ? `withProgress ${this.progressColor}` : ''
    const heightClass = this.fullHeight ? 'fullHeight' : ''
    return `${progressClass} ${heightClass} ${borderColorClass}`
  }

}
