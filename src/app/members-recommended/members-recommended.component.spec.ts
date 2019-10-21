import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MembersRecommendedComponent } from './members-recommended.component';

describe('MembersRecommendedComponent', () => {
  let component: MembersRecommendedComponent;
  let fixture: ComponentFixture<MembersRecommendedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MembersRecommendedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembersRecommendedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
