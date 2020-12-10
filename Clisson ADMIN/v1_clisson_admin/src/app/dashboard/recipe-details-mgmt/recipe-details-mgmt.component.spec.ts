import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeDetailsMgmtComponent } from './recipe-details-mgmt.component';

describe('RecipeDetailsMgmtComponent', () => {
  let component: RecipeDetailsMgmtComponent;
  let fixture: ComponentFixture<RecipeDetailsMgmtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeDetailsMgmtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeDetailsMgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
