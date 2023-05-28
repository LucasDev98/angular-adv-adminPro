import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcountSettingComponent } from './acount-setting.component';

describe('AcountSettingComponent', () => {
  let component: AcountSettingComponent;
  let fixture: ComponentFixture<AcountSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcountSettingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcountSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
