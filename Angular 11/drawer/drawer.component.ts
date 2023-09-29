import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss']
})
export class TgtDrawerComponent implements OnInit {
  @Input() title: string = ''
  @Input() enablePreviousButton: boolean = false
  @Input() enableNextButton: boolean = false
  @Input() showPreviousNextButtons: boolean = false
  @Output() onClose = new EventEmitter<any>();
  @Output() prevNextButtonClick = new EventEmitter<any>()
  @ViewChild('drawer') public drawer: MatDrawer;

  constructor() { }

  ngOnInit(): void {
  }

  toggle(){
    this.drawer.toggle()
  }

  onDrawerClose(){
    this.drawer.toggle()
    this.onClose.emit()
  }

  close(){
    this.drawer.close()
    this.onClose.emit()
  }

  onClickPrevNextButton(){
    if(this.showPreviousNextButtons && this.enablePreviousButton)
      this.prevNextButtonClick.emit('previous')
  }
  onClickNextButton(){
    if(this.showPreviousNextButtons && this.enableNextButton)
      this.prevNextButtonClick.emit('next')
  }

}
