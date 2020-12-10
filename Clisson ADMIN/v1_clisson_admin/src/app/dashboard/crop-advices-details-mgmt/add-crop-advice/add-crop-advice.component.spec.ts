import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCropAdviceComponent } from './add-crop-advice.component';

describe('AddCropAdviceComponent', () => {
  let component: AddCropAdviceComponent;
  let fixture: ComponentFixture<AddCropAdviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCropAdviceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCropAdviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
