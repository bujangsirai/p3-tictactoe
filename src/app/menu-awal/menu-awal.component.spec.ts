import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuAwalComponent } from './menu-awal.component';

describe('MenuAwalComponent', () => {
  let component: MenuAwalComponent;
  let fixture: ComponentFixture<MenuAwalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuAwalComponent]
    });
    fixture = TestBed.createComponent(MenuAwalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
