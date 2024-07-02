import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SnackbarNotificationsComponent } from './snackbar-notifications.component';

describe('SnackbarNotificationsComponent', () => {
  let component: SnackbarNotificationsComponent;
  let fixture: ComponentFixture<SnackbarNotificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SnackbarNotificationsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SnackbarNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
