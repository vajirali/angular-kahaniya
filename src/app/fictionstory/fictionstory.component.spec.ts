import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FictionstoryComponent } from './fictionstory.component';

describe('FictionstoryComponent', () => {
  let component: FictionstoryComponent;
  let fixture: ComponentFixture<FictionstoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FictionstoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FictionstoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
