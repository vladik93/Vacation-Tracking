import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersOnlyErrorComponent } from './users-only-error.component';

describe('UsersOnlyErrorComponent', () => {
  let component: UsersOnlyErrorComponent;
  let fixture: ComponentFixture<UsersOnlyErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersOnlyErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersOnlyErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
