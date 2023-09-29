import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { NgModel } from '@angular/forms';

@Directive({
  selector: '[Url]',
})
export class UrlDirective {
  constructor(private renderer: Renderer2, private elementRef: ElementRef, private ngModel: NgModel) {}

  @HostListener('blur')
  onBlur() {
    let value = this.ngModel.model;
    const defaultHttpProtocol = 'https://';

    if (!value) {
      this.setValue(defaultHttpProtocol);
      return;
    }
    value = value.trim();
    if (!value) {
      value = null;
      this.ngModel.update.emit(value);
      setTimeout(() => this.setValue(defaultHttpProtocol), 0);
      return;
    }
    const isDefaultHttpProtocol = value === defaultHttpProtocol.toLowerCase();

    if (isDefaultHttpProtocol) {
      value = null;
      setTimeout(() => this.setValue(defaultHttpProtocol), 0);
    } else {
      value = !value.includes(defaultHttpProtocol) ? `${defaultHttpProtocol}${value}` : value;
    }

    this.ngModel.update.emit(value);
  }

  setValue(value: string) {
    this.renderer.setProperty(this.elementRef.nativeElement, 'value', value);
    this.renderer.setAttribute(this.elementRef.nativeElement, 'value', value);
  }
}
