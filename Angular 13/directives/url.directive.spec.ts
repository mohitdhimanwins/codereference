import { Component, ElementRef, Renderer2 } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NgModel } from '@angular/forms';
import { UrlDirective } from './url.directive';
import { By } from '@angular/platform-browser';

describe('UrlDirective', () => {
  let directive: UrlDirective;
  let fixture: ComponentFixture<TestComponent>;
  let rendererMock: Renderer2;
  let elementRefMock: ElementRef;
  let ngModelMock: NgModel;
  let inputElement: HTMLInputElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [UrlDirective, TestComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    directive = fixture.debugElement.children[0].injector.get(UrlDirective);
    ngModelMock = directive['ngModel'];
    elementRefMock = directive['elementRef'];
    rendererMock = directive['renderer'];
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should set value to null and call setValue with defaultHttpProtocol if value is empty', () => {
    // Arrange
    const directive = new UrlDirective(rendererMock, elementRefMock, ngModelMock);
    const spySetValue = jest.spyOn(directive, 'setValue');
    const value = 'https://';
    const defaultHttpProtocol = value;
    const spyUpdateEmit = jest.spyOn(ngModelMock.update, 'emit');
    ngModelMock.update.emit('https://www.google.com');
    expect(spyUpdateEmit).toHaveBeenCalledWith('https://www.google.com');
    directive.onBlur();
    expect(spySetValue).toHaveBeenCalledWith(defaultHttpProtocol);
  });

  it('should trim the value', () => {
    const value = '    Hello World    ';
    const trimmedValue = value.trim();
    expect(trimmedValue).toBe('Hello World');
  });

  it('should update the value to null and set the default protocol if the input is empty', () => {
    const spyUpdateEmit = jest.spyOn(ngModelMock.update, 'emit');
    const spySetValue = jest.spyOn(directive, 'setValue');
    ngModelMock.update.emit('https://www.google.com');
    directive.onBlur();
    expect(spyUpdateEmit).toHaveBeenCalledWith('https://www.google.com');
    expect(spySetValue).toHaveBeenCalledWith('https://');
  });

  it('should trim the value before processing it', () => {
    ngModelMock.model = 'example.com';
    jest.spyOn(ngModelMock.update, 'emit');
    ngModelMock.update.emit('https://www.google.com');
    directive.onBlur();
    expect(ngModelMock.update.emit).toHaveBeenCalledWith('https://example.com');
  });

  it('should set value and attribute', () => {
    const value = 'http://example.com';
    directive.setValue(value);
    expect(elementRefMock.nativeElement.value).toEqual(value);
    expect(elementRefMock.nativeElement.getAttribute('value')).toEqual(value);
  });
});

@Component({
  template: ` <input type="text" [(ngModel)]="url" Url /> `,
})
class TestComponent {
  url: string;
}
