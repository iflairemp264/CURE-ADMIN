import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateVarietyCategoryComponent } from './update-variety-category.component';

describe('UpdateVarietyCategoryComponent', () => {
  let component: UpdateVarietyCategoryComponent;
  let fixture: ComponentFixture<UpdateVarietyCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateVarietyCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateVarietyCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
