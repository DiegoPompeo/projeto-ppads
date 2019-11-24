import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsComComponent } from './friends-com.component';

describe('FriendsComComponent', () => {
  let component: FriendsComComponent;
  let fixture: ComponentFixture<FriendsComComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendsComComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendsComComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
