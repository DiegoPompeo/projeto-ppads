import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlossarySuccessComponent } from './glossary-success.component';

describe('GlossarySuccessComponent', () => {
  let component: GlossarySuccessComponent;
  let fixture: ComponentFixture<GlossarySuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlossarySuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlossarySuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
