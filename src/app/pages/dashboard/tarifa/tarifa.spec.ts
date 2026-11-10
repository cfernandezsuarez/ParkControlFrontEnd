import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Tarifa } from './tarifa';

describe('Tarifa', () => {
  let component: Tarifa;
  let fixture: ComponentFixture<Tarifa>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Tarifa],
    }).compileComponents();

    fixture = TestBed.createComponent(Tarifa);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
