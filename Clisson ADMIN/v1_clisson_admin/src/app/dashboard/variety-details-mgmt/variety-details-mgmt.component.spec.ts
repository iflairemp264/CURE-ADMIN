import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VarietyDetailsMgmtComponent } from './variety-details-mgmt.component';

describe('VarietyDetailsMgmtComponent', () => {
  let component: VarietyDetailsMgmtComponent;
  let fixture: ComponentFixture<VarietyDetailsMgmtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VarietyDetailsMgmtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VarietyDetailsMgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
