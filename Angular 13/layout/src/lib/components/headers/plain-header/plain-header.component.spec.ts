import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PlainHeaderComponent } from './plain-header.component';
import { TranslateModule } from '@ngx-translate/core';

describe('PlainHeaderComponent', () => {
  let component: PlainHeaderComponent;
  let fixture: ComponentFixture<PlainHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlainHeaderComponent ],
      imports: [TranslateModule.forRoot({}), MatTooltipModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlainHeaderComponent);
    component = fixture.componentInstance;
    const user = {firstName: 'John', lastName: 'Doe'};
    const userName = user.firstName + ' ' + user.lastName;
    component.user = {...component.user, ...user, userName };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
