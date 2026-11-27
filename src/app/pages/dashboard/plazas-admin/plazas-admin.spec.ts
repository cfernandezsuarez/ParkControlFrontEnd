import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlazasAdmin } from './plazas-admin';

describe('PlazasAdmin', () => {
  let component: PlazasAdmin;
  let fixture: ComponentFixture<PlazasAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlazasAdmin],
    }).compileComponents();

    fixture = TestBed.createComponent(PlazasAdmin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
