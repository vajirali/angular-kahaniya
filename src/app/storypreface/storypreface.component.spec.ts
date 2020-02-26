import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryprefaceComponent } from './storypreface.component';

describe('StoryprefaceComponent', () => {
  let component: StoryprefaceComponent;
  let fixture: ComponentFixture<StoryprefaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoryprefaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoryprefaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
