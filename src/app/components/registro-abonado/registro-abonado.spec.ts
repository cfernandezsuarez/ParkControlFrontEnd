import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroAbonado } from './registro-abonado';

describe('RegistroAbonado', () => {
  let component: RegistroAbonado;
  let fixture: ComponentFixture<RegistroAbonado>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroAbonado],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroAbonado);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
