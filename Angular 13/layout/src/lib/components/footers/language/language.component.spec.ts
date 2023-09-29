import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Language } from '@entities';
import { AppFacade, MockAppFacade } from '@store/app';
import { LanguageComponent } from './language.component';

describe('LanguageComponent', () => {
  let component: LanguageComponent;
  let fixture: ComponentFixture<LanguageComponent>;
  let appFacade: AppFacade;
  beforeEach(async () => {
    
    await TestBed.configureTestingModule({
      declarations: [ LanguageComponent ],
      providers: [
        { 
          provide: AppFacade, useValue: MockAppFacade
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    appFacade = TestBed.inject(AppFacade);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update active language on language change', () => {
    const mockFacadeMethod = jest.spyOn(appFacade, 'changeLanguage');
    component.changeLanguage(Language.French);
    expect(component.activeLanguage).toBe(Language.French);
    expect(mockFacadeMethod).toHaveBeenCalledWith(Language.French);
  });

});
