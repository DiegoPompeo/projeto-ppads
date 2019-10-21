import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCientistsComponent } from './list-cientists.component';

describe('ListCientistsComponent', () => {
  let component: ListCientistsComponent;
  let fixture: ComponentFixture<ListCientistsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCientistsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCientistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
