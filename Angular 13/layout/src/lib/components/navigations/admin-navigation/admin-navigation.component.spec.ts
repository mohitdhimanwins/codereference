import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { ServicesModule } from '@shared/services';
import { NavigationService } from '../../../services';
import { AdminNavigationComponent } from './admin-navigation.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PipesModule } from '@shared/pipes';

describe('AdminNavigationComponent', () => {
  let component: AdminNavigationComponent;
  let fixture: ComponentFixture<AdminNavigationComponent>;
  let navigationService: NavigationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminNavigationComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        TranslateModule.forRoot({}),
        MatTooltipModule, 
        PipesModule
      ],
      providers: [{ provide: NavigationService, useValue: { buildUserMenuItems: jest.fn() } }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    navigationService = TestBed.inject(NavigationService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggleSidebar method', () => {
    const mockEmit = jest.spyOn(component.toggle, 'emit');
    component.isToggle = false;
    component.toggleSidebar();
    expect(component.isToggle).toBe(true);
    expect(mockEmit).toHaveBeenCalled();
  });
});
