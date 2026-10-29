import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Precio } from './precio';

describe('Precio', () => {
  let component: Precio;
  let fixture: ComponentFixture<Precio>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Precio],
    }).compileComponents();

    fixture = TestBed.createComponent(Precio);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
