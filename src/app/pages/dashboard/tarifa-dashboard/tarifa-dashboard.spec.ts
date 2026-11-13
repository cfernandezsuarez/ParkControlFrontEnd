import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TarifaDashboard } from './tarifa-dashboard';

describe('TarifaDashboard', () => {
  let component: TarifaDashboard;
  let fixture: ComponentFixture<TarifaDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TarifaDashboard],
    }).compileComponents();

    fixture = TestBed.createComponent(TarifaDashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
