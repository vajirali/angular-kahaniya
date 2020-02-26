import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilewritingComponent } from './profilewriting.component';

describe('ProfilewritingComponent', () => {
  let component: ProfilewritingComponent;
  let fixture: ComponentFixture<ProfilewritingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilewritingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilewritingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
