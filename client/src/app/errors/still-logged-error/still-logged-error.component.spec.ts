import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StillLoggedErrorComponent } from './still-logged-error.component';

describe('StillLoggedErrorComponent', () => {
  let component: StillLoggedErrorComponent;
  let fixture: ComponentFixture<StillLoggedErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StillLoggedErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StillLoggedErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
