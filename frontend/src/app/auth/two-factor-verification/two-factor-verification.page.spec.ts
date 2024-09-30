import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TwoFactorVerificationPage } from './two-factor-verification.page';

describe('TwoFactorVerificationPage', () => {
  let component: TwoFactorVerificationPage;
  let fixture: ComponentFixture<TwoFactorVerificationPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TwoFactorVerificationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
