import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatAdminComponent } from './updat-admin.component';

describe('UpdatAdminComponent', () => {
  let component: UpdatAdminComponent;
  let fixture: ComponentFixture<UpdatAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
