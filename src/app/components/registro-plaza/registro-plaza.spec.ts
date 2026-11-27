import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroPlaza } from './registro-plaza';

describe('RegistroPlaza', () => {
  let component: RegistroPlaza;
  let fixture: ComponentFixture<RegistroPlaza>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroPlaza],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroPlaza);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
