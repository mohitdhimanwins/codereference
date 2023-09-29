import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { Theme } from '@entities';
import { AppFacade, MockAppFacade, } from '@store/app';
import { ThemesComponent } from './themes.component';

describe('ThemesComponent', () => {
  let component: ThemesComponent;
  let fixture: ComponentFixture<ThemesComponent>;
  let appFacade: AppFacade;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThemesComponent ],
      imports :[FormsModule,MatMenuModule],
      providers: [
        {
          provide: AppFacade,
          useValue: MockAppFacade,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemesComponent);
    component = fixture.componentInstance;
    appFacade = TestBed.inject(AppFacade);
   
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
  
  it('should check change theme method', () => {
    const mockFacadeChangeTheme = jest.spyOn(appFacade, 'changeTheme');
    const theme = Theme.Dark;
    component.changeTheme(theme);

    expect(mockFacadeChangeTheme).toHaveBeenCalled();
    expect(mockFacadeChangeTheme).toHaveBeenCalledWith(theme);
  });
 
});
