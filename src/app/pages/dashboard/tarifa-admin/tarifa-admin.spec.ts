import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TarifaAdmin } from './tarifa-admin';

describe('TarifaAdmin', () => {
  let component: TarifaAdmin;
  let fixture: ComponentFixture<TarifaAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TarifaAdmin],
    }).compileComponents();

    fixture = TestBed.createComponent(TarifaAdmin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
