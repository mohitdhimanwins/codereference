import { TestBed } from '@angular/core/testing';
import { ConditionalTooltipDirective } from './conditional-tooltip.directive';
import { ElementRef } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';

describe('ConditionalTooltipDirective', () => {
  let directive: ConditionalTooltipDirective;
  let elementRef: ElementRef;
  let tooltip: MatTooltip;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ConditionalTooltipDirective,
        { provide: ElementRef, useValue: { nativeElement: { querySelector: jest.fn() } } },
        { provide: MatTooltip, useValue: { show: jest.fn(), hide: jest.fn() } }
      ]
    });
    directive = TestBed.inject(ConditionalTooltipDirective);
    elementRef = TestBed.inject(ElementRef);
    tooltip = TestBed.inject(MatTooltip);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });
  

  it('should show tooltip if text is too long', () => {
    const textElement = { offsetWidth: 10, scrollWidth: 20 };
    jest.spyOn(elementRef.nativeElement, 'querySelector').mockReturnValue(textElement);
    directive.tooltipText = 'some long text';
    directive.mouseover();
    expect(tooltip.message).toBe('some long text');
    expect(tooltip.position).toBe('below');
    expect(tooltip.show).toHaveBeenCalled();
    expect(directive.tooltipText).toBeTruthy();
  });

  it('should hide tooltip on mouseleave', () => {
    directive.tooltipText =  'short text';
    directive.mouseleave();
    expect(tooltip.hide).toBeTruthy()
  });
});
