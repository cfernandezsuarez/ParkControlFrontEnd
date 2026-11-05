import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MiAbono } from './mi-abono';

describe('MiAbono', () => {
  let component: MiAbono;
  let fixture: ComponentFixture<MiAbono>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiAbono],
    }).compileComponents();

    fixture = TestBed.createComponent(MiAbono);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
