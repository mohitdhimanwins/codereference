import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { MatTooltip, TooltipPosition } from '@angular/material/tooltip';

@Directive({
  selector: '[conditionalTooltip]',
  providers: [MatTooltip],
})
export class ConditionalTooltipDirective {
  @Input() tooltipText: string | number = '';
  @Input() tooltipPosition: TooltipPosition = 'below';

  private tooltipVisible = false;
  constructor(private elementRef: ElementRef, private tooltip: MatTooltip) {}

  @HostListener('mouseover') mouseover() {
    const element = this.elementRef.nativeElement as HTMLElement;
    const textElement = element ? (element.querySelector('span') as HTMLElement) : null;
    if (!textElement) return;

    this.tooltipVisible = !!this.tooltipText && textElement.offsetWidth < textElement.scrollWidth;
    if (this.tooltipVisible) {
      this.tooltip.message = this.tooltipText?.toString();
      this.tooltip.position = this.tooltipPosition;
      this.tooltip.show();
    }
  }
  @HostListener('mouseleave') mouseleave() {
    if (this.tooltipVisible) this.tooltip.hide();
  }
}
