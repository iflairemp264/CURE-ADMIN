import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CropAdvicesDetailsMgmtComponent } from './crop-advices-details-mgmt.component';

describe('CropAdvicesDetailsMgmtComponent', () => {
  let component: CropAdvicesDetailsMgmtComponent;
  let fixture: ComponentFixture<CropAdvicesDetailsMgmtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CropAdvicesDetailsMgmtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CropAdvicesDetailsMgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
