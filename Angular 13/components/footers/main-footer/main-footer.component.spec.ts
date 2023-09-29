import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { MockConfigLinkPipe } from '@shared/pipes';
import { MockDialogService, ModalService } from '@shared/services';
import { MainFooterComponent } from './main-footer.component';

describe('MainFooterComponent', () => {
  let component: MainFooterComponent;
  let fixture: ComponentFixture<MainFooterComponent>;
  let modalService: ModalService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainFooterComponent, MockConfigLinkPipe],
      imports: [TranslateModule.forRoot()],
      providers: [
        { provide: ModalService, useValue: MockDialogService },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    modalService = TestBed.inject(ModalService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should printCreditapp method', () => {
    const openSpy = jest.spyOn(modalService, 'open');
    component.openSessionInfo();
    expect(openSpy).toHaveBeenCalled();
  });
});
