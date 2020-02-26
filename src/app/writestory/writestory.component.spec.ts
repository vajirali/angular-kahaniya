import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WritestoryComponent } from './writestory.component';

describe('WritestoryComponent', () => {
  let component: WritestoryComponent;
  let fixture: ComponentFixture<WritestoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WritestoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WritestoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
