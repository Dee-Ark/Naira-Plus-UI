import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillspaymentComponent } from './billspayment.component';

describe('BillspaymentComponent', () => {
  let component: BillspaymentComponent;
  let fixture: ComponentFixture<BillspaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillspaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillspaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
