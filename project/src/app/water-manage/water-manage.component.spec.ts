import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaterManageComponent } from './water-manage.component';

describe('WaterManageComponent', () => {
  let component: WaterManageComponent;
  let fixture: ComponentFixture<WaterManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaterManageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WaterManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
