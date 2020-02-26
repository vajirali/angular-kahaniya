import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadingstoryComponent } from './readingstory.component';

describe('ReadingstoryComponent', () => {
  let component: ReadingstoryComponent;
  let fixture: ComponentFixture<ReadingstoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadingstoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadingstoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
