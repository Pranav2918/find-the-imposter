export type GamePhase = 'setup' | 'reveal' | 'playing' | 'result';

export interface Player {
  id: string;
  name: string;
  isImposter: boolean;
  hasViewed: boolean;
}

export interface GameState {
  phase: GamePhase;
  players: Player[];
  categoryId: string;
  categoryName: string;
  word: string;
  imposterCount: number;
  currentRevealIndex: number;
  revealedWord: boolean;
}
