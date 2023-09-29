import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from '@shared/pipes';
import { Location } from '@angular/common';
import { MockUserFacade, UserFacade } from '@store/user';
import { ContactUsPageComponent } from './contact-us-page.component';

describe('ContactUsPageComponent', () => {
  let component: ContactUsPageComponent;
  let fixture: ComponentFixture<ContactUsPageComponent>;
  let location: Location;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContactUsPageComponent],
      imports: [
        PipesModule,
        TranslateModule.forRoot()
      ],
      providers: [
        {provide: UserFacade, useValue: MockUserFacade},
        {provide: Location, useValue: {back: jest.fn()}}
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactUsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    location = TestBed.inject(Location);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check back', () => {
    const mockLocationBackMethod = jest.spyOn(location, 'back');
    component.back();
    expect(mockLocationBackMethod).toHaveBeenCalled();
  });
});
