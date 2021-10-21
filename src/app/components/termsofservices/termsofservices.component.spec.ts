import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsofservicesComponent } from './termsofservices.component';

describe('TermsofservicesComponent', () => {
  let component: TermsofservicesComponent;
  let fixture: ComponentFixture<TermsofservicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TermsofservicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TermsofservicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
