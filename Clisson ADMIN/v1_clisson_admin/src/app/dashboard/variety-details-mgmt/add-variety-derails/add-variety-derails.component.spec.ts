import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVarietyDerailsComponent } from './add-variety-derails.component';

describe('AddVarietyDerailsComponent', () => {
  let component: AddVarietyDerailsComponent;
  let fixture: ComponentFixture<AddVarietyDerailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddVarietyDerailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddVarietyDerailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
