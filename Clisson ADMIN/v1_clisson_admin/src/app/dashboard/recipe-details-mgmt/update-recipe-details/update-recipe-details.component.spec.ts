import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRecipeDetailsComponent } from './update-recipe-details.component';

describe('UpdateRecipeDetailsComponent', () => {
  let component: UpdateRecipeDetailsComponent;
  let fixture: ComponentFixture<UpdateRecipeDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateRecipeDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateRecipeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
