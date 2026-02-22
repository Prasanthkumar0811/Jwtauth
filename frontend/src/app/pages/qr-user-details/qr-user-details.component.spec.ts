import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrUserDetailsComponent } from './qr-user-details.component';

describe('QrUserDetailsComponent', () => {
  let component: QrUserDetailsComponent;
  let fixture: ComponentFixture<QrUserDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QrUserDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QrUserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
