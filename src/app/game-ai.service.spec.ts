import { TestBed } from '@angular/core/testing';

import { GameAiService } from './game-ai.service';

describe('GameAiService', () => {
  let service: GameAiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameAiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
