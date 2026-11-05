import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Abonados } from './abonados';

describe('Abonados', () => {
  let component: Abonados;
  let fixture: ComponentFixture<Abonados>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Abonados],
    }).compileComponents();

    fixture = TestBed.createComponent(Abonados);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
