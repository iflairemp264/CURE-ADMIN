import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateVarietyDerailsComponent } from './update-variety-derails.component';

describe('UpdateVarietyDerailsComponent', () => {
  let component: UpdateVarietyDerailsComponent;
  let fixture: ComponentFixture<UpdateVarietyDerailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateVarietyDerailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateVarietyDerailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
