import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IrrigationManageComponent } from './irrigation-manage.component';

describe('IrrigationManageComponent', () => {
  let component: IrrigationManageComponent;
  let fixture: ComponentFixture<IrrigationManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IrrigationManageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IrrigationManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
