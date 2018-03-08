import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultNumbersComponent } from './result-numbers.component';

describe('ResultNumbersComponent', () => {
  let component: ResultNumbersComponent;
  let fixture: ComponentFixture<ResultNumbersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultNumbersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultNumbersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
