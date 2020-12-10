import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCropAdviceComponent } from './edit-crop-advice.component';

describe('EditCropAdviceComponent', () => {
  let component: EditCropAdviceComponent;
  let fixture: ComponentFixture<EditCropAdviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCropAdviceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCropAdviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
