import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { CookieConsentComponent } from './cookie-consent.component';
import { MockConfigLinkPipe } from '@shared/pipes';

describe('CookieConsentComponent', () => {
  let component: CookieConsentComponent;
  let fixture: ComponentFixture<CookieConsentComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CookieConsentComponent, MockConfigLinkPipe ],
      imports: [TranslateModule.forRoot({})],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]

    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CookieConsentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check close content', ()=>{
    const spyMockEmit = jest.spyOn(component.closeConsent, 'emit');
    component.close();
    expect(spyMockEmit).toHaveBeenCalled();
  });

  it('should check accept content', ()=>{
    const spyMockEmit = jest.spyOn(component.acceptConsent, 'emit');
    component.accept();
    expect(spyMockEmit).toHaveBeenCalled();
  });
  
});
