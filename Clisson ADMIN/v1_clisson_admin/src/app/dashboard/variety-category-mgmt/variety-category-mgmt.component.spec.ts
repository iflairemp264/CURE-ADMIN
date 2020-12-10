import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VarietyCategoryMgmtComponent } from './variety-category-mgmt.component';

describe('VarietyCategoryMgmtComponent', () => {
  let component: VarietyCategoryMgmtComponent;
  let fixture: ComponentFixture<VarietyCategoryMgmtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VarietyCategoryMgmtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VarietyCategoryMgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
