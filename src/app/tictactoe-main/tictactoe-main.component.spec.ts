import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TictactoeMainComponent } from './tictactoe-main.component';

describe('TictactoeMainComponent', () => {
  let component: TictactoeMainComponent;
  let fixture: ComponentFixture<TictactoeMainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TictactoeMainComponent]
    });
    fixture = TestBed.createComponent(TictactoeMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
