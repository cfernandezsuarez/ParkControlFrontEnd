import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Plazas } from './plazas';

describe('Plazas', () => {
  let component: Plazas;
  let fixture: ComponentFixture<Plazas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Plazas],
    }).compileComponents();

    fixture = TestBed.createComponent(Plazas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
