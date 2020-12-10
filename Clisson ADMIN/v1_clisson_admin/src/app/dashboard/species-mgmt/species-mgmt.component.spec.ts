import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeciesMgmtComponent } from './species-mgmt.component';

describe('SpeciesMgmtComponent', () => {
  let component: SpeciesMgmtComponent;
  let fixture: ComponentFixture<SpeciesMgmtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpeciesMgmtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeciesMgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
