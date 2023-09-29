import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from '@shared/pipes';
import { MockUtilityService, UtilityService } from '@shared/services';
import { AppFacade, MockAppFacade } from '@store/app';
import { MockUserFacade, UserFacade } from '@store/user';
import { OuterLayoutComponent } from './outer-layout.component';

describe('OuterLayoutComponent', () => {
  let component: OuterLayoutComponent;
  let fixture: ComponentFixture<OuterLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OuterLayoutComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [TranslateModule.forRoot(), MatCardModule, PipesModule],
      providers: [
        { provide: AppFacade, useValue: MockAppFacade },
        { provide: UserFacade, useValue: MockUserFacade },
        { provide: UtilityService, useValue: MockUtilityService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OuterLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
