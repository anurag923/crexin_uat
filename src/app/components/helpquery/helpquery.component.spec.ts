import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpqueryComponent } from './helpquery.component';

describe('HelpqueryComponent', () => {
  let component: HelpqueryComponent;
  let fixture: ComponentFixture<HelpqueryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelpqueryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpqueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
