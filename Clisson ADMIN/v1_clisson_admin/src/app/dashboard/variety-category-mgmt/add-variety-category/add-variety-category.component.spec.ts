import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVarietyCategoryComponent } from './add-variety-category.component';

describe('AddVarietyCategoryComponent', () => {
  let component: AddVarietyCategoryComponent;
  let fixture: ComponentFixture<AddVarietyCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddVarietyCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddVarietyCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
