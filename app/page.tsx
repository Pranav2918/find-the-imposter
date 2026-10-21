'use client';

import { useState, useCallback } from 'react';
import { CATEGORIES, getRandomWord } from '@/lib/categories';
import { GameState, Player } from '@/lib/types';

type Screen = 'home' | 'setup' | 'reveal' | 'playing' | 'result';

function generateId() {
  return Math.random().toString(36).slice(2);
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ── HOME SCREEN ─────────────────────────────────────────────────────────────
function HomeScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-6 text-white">
      <div className="text-center max-w-md w-full">
        <div className="text-8xl mb-4 animate-bounce">🕵️</div>
        <h1 className="text-5xl font-black mb-2 tracking-tight bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
          Find the
        </h1>
        <h1 className="text-5xl font-black mb-6 tracking-tight bg-gradient-to-r from-pink-300 to-red-400 bg-clip-text text-transparent">
          Imposter
        </h1>
        <p className="text-slate-300 text-lg mb-2">🇮🇳 Desi Edition</p>
        <p className="text-slate-400 text-sm mb-10">
          Pass the phone around. One player gets no word — they are the Imposter!
        </p>

        <button
          onClick={onStart}
          className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl text-xl font-bold shadow-lg shadow-purple-500/30 active:scale-95 transition-transform"
        >
          🎮 Start Game
        </button>

        {/* How to Play */}
        <div className="mt-10 text-left bg-white/5 rounded-2xl p-5 border border-white/10">
          <h2 className="font-bold text-lg mb-3 text-purple-300">📖 How to Play</h2>
          <ol className="space-y-2 text-slate-300 text-sm list-decimal list-inside">
            <li>Add 3–12 players with their names</li>
            <li>Choose a category & number of imposters</li>
            <li>Pass the phone to each player secretly</li>
            <li>Everyone sees the word — except the Imposter(s)!</li>
            <li>Take turns giving one-word clues related to the secret word</li>
            <li>Discuss, vote, and Reveal the Imposter!</li>
          </ol>
        </div>
      </div>
    </div>
  );
}

// ── SETUP SCREEN ─────────────────────────────────────────────────────────────
function SetupScreen({ onPlay }: { onPlay: (players: string[], categoryId: string, imposterCount: number) => void }) {
  const [names, setNames] = useState<string[]>(['', '']);
  const [categoryId, setCategoryId] = useState(CATEGORIES[0].id);
  const [imposterCount, setImposterCount] = useState(1);
  const [error, setError] = useState('');

  const addPlayer = () => {
    if (names.length < 12) setNames([...names, '']);
  };

  const removePlayer = (i: number) => {
    if (names.length > 2) setNames(names.filter((_, idx) => idx !== i));
  };

  const updateName = (i: number, val: string) => {
    const next = [...names];
    next[i] = val;
    setNames(next);
  };

  const handleStart = () => {
    const filled = names.map(n => n.trim()).filter(Boolean);
    if (filled.length < 3) { setError('Need at least 3 players!'); return; }
    if (new Set(filled).size !== filled.length) { setError('Player names must be unique!'); return; }
    if (imposterCount >= filled.length) { setError('Too many imposters for this group!'); return; }
    setError('');
    onPlay(filled, categoryId, imposterCount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white px-4 py-8">
      <div className="max-w-md mx-auto">
        <h2 className="text-3xl font-black mb-6 text-center">⚙️ Game Setup</h2>

        {/* Players */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-lg text-purple-300">👥 Players ({names.length}/12)</h3>
          </div>
          <div className="space-y-2">
            {names.map((name, i) => (
              <div key={i} className="flex gap-2">
                <input
                  type="text"
                  placeholder={`Player ${i + 1}`}
                  value={name}
                  onChange={e => updateName(i, e.target.value)}
                  maxLength={20}
                  className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-purple-400 focus:bg-white/15 transition-colors"
                />
                {names.length > 2 && (
                  <button
                    onClick={() => removePlayer(i)}
                    className="px-3 bg-red-500/20 border border-red-500/30 rounded-xl text-red-400 hover:bg-red-500/30 transition-colors"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
          </div>
          {names.length < 12 && (
            <button
              onClick={addPlayer}
              className="mt-3 w-full py-2 bg-white/5 border border-dashed border-white/20 rounded-xl text-slate-400 hover:bg-white/10 transition-colors text-sm"
            >
              + Add Player
            </button>
          )}
        </div>

        {/* Category */}
        <div className="mb-6">
          <h3 className="font-bold text-lg text-purple-300 mb-3">📦 Category</h3>
          <div className="grid grid-cols-2 gap-2">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setCategoryId(cat.id)}
                className={`p-3 rounded-xl border text-left transition-all active:scale-95 ${
                  categoryId === cat.id
                    ? 'bg-purple-500/30 border-purple-400 text-white'
                    : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                }`}
              >
                <div className="text-xl">{cat.emoji}</div>
                <div className="text-xs mt-1 font-medium leading-tight">{cat.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Imposter Count */}
        <div className="mb-6">
          <h3 className="font-bold text-lg text-purple-300 mb-3">🎭 Number of Imposters</h3>
          <div className="flex gap-3">
            {[1, 2].map(n => (
              <button
                key={n}
                onClick={() => setImposterCount(n)}
                className={`flex-1 py-4 rounded-xl border text-xl font-bold transition-all active:scale-95 ${
                  imposterCount === n
                    ? 'bg-red-500/30 border-red-400 text-red-300'
                    : 'bg-white/5 border-white/10 text-slate-300'
                }`}
              >
                {n} Imposter{n > 1 ? 's' : ''}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-xl text-red-300 text-sm text-center">
            ⚠️ {error}
          </div>
        )}

        <button
          onClick={handleStart}
          className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl text-xl font-bold shadow-lg shadow-purple-500/30 active:scale-95 transition-transform"
        >
          🚀 Start Round
        </button>
      </div>
    </div>
  );
}

// ── CARD REVEAL SCREEN ───────────────────────────────────────────────────────
function RevealScreen({
  game,
  onViewDone,
  onAllViewed,
}: {
  game: GameState;
  onViewDone: () => void;
  onAllViewed: () => void;
}) {
  const [shown, setShown] = useState(false);
  const current = game.players[game.currentRevealIndex];
  const isLast = game.currentRevealIndex === game.players.length - 1;

  const handleReveal = () => setShown(true);

  const handleDone = () => {
    setShown(false);
    if (isLast) {
      onAllViewed();
    } else {
      onViewDone();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white flex flex-col items-center justify-center px-6">
      <div className="max-w-sm w-full text-center">
        {/* Progress dots */}
        <div className="flex gap-1.5 justify-center mb-8">
          {game.players.map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all ${
                i < game.currentRevealIndex
                  ? 'w-6 bg-purple-400'
                  : i === game.currentRevealIndex
                  ? 'w-8 bg-pink-400'
                  : 'w-2 bg-white/20'
              }`}
            />
          ))}
        </div>

        <p className="text-slate-400 text-sm mb-2">
          Player {game.currentRevealIndex + 1} of {game.players.length}
        </p>
        <h2 className="text-3xl font-black mb-8">
          👋 Hey, <span className="text-pink-300">{current.name}!</span>
        </h2>

        {!shown ? (
          <>
            <p className="text-slate-300 mb-8 text-sm">
              Make sure no one else is watching.<br />Tap the card to see your word.
            </p>
            <button
              onClick={handleReveal}
              className="w-full py-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl text-6xl shadow-2xl shadow-purple-500/40 active:scale-95 transition-transform border border-white/10"
            >
              🃏
              <p className="text-lg font-bold mt-3">Tap to reveal</p>
            </button>
          </>
        ) : (
          <>
            {current.isImposter ? (
              <div className="w-full py-16 bg-gradient-to-br from-red-900 to-red-700 rounded-3xl shadow-2xl border border-red-500/50 mb-8">
                <div className="text-6xl mb-4">😈</div>
                <p className="text-red-200 text-sm font-medium mb-2">You are the</p>
                <p className="text-4xl font-black text-red-100">IMPOSTER!</p>
                <p className="text-red-300 text-xs mt-4 px-4">
                  You don&apos;t know the word. Blend in, give vague clues, don&apos;t get caught!
                </p>
              </div>
            ) : (
              <div className="w-full py-16 bg-gradient-to-br from-purple-800 to-indigo-800 rounded-3xl shadow-2xl border border-purple-400/30 mb-8">
                <div className="text-4xl mb-4">🔑</div>
                <p className="text-purple-200 text-sm font-medium mb-2">Secret word:</p>
                <p className="text-4xl font-black text-white">{game.word}</p>
                <p className="text-purple-300 text-xs mt-4 px-4">
                  Give clues without making it too obvious!
                </p>
              </div>
            )}
            <button
              onClick={handleDone}
              className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl text-lg font-bold active:scale-95 transition-transform"
            >
              {isLast ? '🎮 Everyone is ready!' : '➡️ Pass to next player'}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// ── PLAYING SCREEN ───────────────────────────────────────────────────────────
function PlayingScreen({
  game,
  onReveal,
  onNewGame,
}: {
  game: GameState;
  onReveal: () => void;
  onNewGame: () => void;
}) {
  const [confirmReveal, setConfirmReveal] = useState(false);
  const category = CATEGORIES.find(c => c.id === game.categoryId)!;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white px-4 py-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">{category.emoji}</div>
          <p className="text-purple-300 font-medium">{category.name}</p>
          <h2 className="text-2xl font-black mt-1">Game in Progress...</h2>
        </div>

        {/* Players list */}
        <div className="bg-white/5 rounded-2xl p-4 border border-white/10 mb-6">
          <h3 className="text-purple-300 font-bold mb-3">👥 Players</h3>
          <div className="grid grid-cols-2 gap-2">
            {game.players.map(p => (
              <div key={p.id} className="bg-white/5 rounded-xl px-3 py-2 text-sm font-medium">
                {p.name}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/5 rounded-2xl p-4 border border-white/10 mb-8">
          <h3 className="text-purple-300 font-bold mb-2">💡 Reminder</h3>
          <ul className="text-slate-300 text-sm space-y-1.5">
            <li>• Each player gives one-word clues</li>
            <li>• Don&apos;t say the secret word directly</li>
            <li>• Imposter must bluff their way through</li>
            <li>• Discuss and vote when ready</li>
          </ul>
        </div>

        {!confirmReveal ? (
          <button
            onClick={() => setConfirmReveal(true)}
            className="w-full py-4 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl text-lg font-bold shadow-lg shadow-red-500/30 active:scale-95 transition-transform mb-3"
          >
            🔍 Reveal the Imposter!
          </button>
        ) : (
          <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-4 mb-3">
            <p className="text-center text-red-300 font-bold mb-3">Sure everyone has voted?</p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmReveal(false)}
                className="flex-1 py-3 bg-white/10 rounded-xl font-medium active:scale-95 transition-transform"
              >
                Not yet
              </button>
              <button
                onClick={onReveal}
                className="flex-1 py-3 bg-red-500 rounded-xl font-bold active:scale-95 transition-transform"
              >
                Yes, Reveal!
              </button>
            </div>
          </div>
        )}

        <button
          onClick={onNewGame}
          className="w-full py-3 bg-white/5 border border-white/10 rounded-2xl text-slate-400 text-sm active:scale-95 transition-transform"
        >
          ↩ Cancel & New Game
        </button>
      </div>
    </div>
  );
}

// ── RESULT SCREEN ─────────────────────────────────────────────────────────────
function ResultScreen({
  game,
  onPlayAgain,
  onNewGame,
}: {
  game: GameState;
  onPlayAgain: () => void;
  onNewGame: () => void;
}) {
  const imposters = game.players.filter(p => p.isImposter);
  const crewmates = game.players.filter(p => !p.isImposter);
  const category = CATEGORIES.find(c => c.id === game.categoryId)!;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white px-4 py-8">
      <div className="max-w-md mx-auto text-center">
        <div className="text-7xl mb-4">🎭</div>
        <h2 className="text-4xl font-black mb-2">Reveal!</h2>
        <p className="text-slate-400 mb-8">Here&apos;s who was lying all along...</p>

        {/* Imposters */}
        <div className="bg-gradient-to-br from-red-900/60 to-red-800/40 border border-red-500/40 rounded-2xl p-5 mb-4">
          <p className="text-red-300 text-sm font-medium mb-1">
            😈 {imposters.length > 1 ? 'Imposters were' : 'Imposter was'}
          </p>
          <div className="flex flex-wrap gap-2 justify-center mt-2">
            {imposters.map(p => (
              <span key={p.id} className="bg-red-500/30 border border-red-400/40 px-4 py-2 rounded-xl text-xl font-black text-red-100">
                {p.name}
              </span>
            ))}
          </div>
        </div>

        {/* Word reveal */}
        <div className="bg-gradient-to-br from-purple-900/60 to-indigo-900/40 border border-purple-500/40 rounded-2xl p-5 mb-4">
          <p className="text-purple-300 text-sm font-medium mb-1">
            {category.emoji} Secret word in <strong>{category.name}</strong>
          </p>
          <p className="text-4xl font-black text-white mt-2">{game.word}</p>
        </div>

        {/* Crewmates */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-8">
          <p className="text-slate-400 text-sm mb-2">✅ Crewmates</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {crewmates.map(p => (
              <span key={p.id} className="bg-white/10 px-3 py-1 rounded-lg text-sm text-slate-300">
                {p.name}
              </span>
            ))}
          </div>
        </div>

        <button
          onClick={onPlayAgain}
          className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl text-xl font-bold shadow-lg shadow-purple-500/30 active:scale-95 transition-transform mb-3"
        >
          🔁 Play Again (Same Players)
        </button>
        <button
          onClick={onNewGame}
          className="w-full py-3 bg-white/5 border border-white/10 rounded-2xl text-slate-400 active:scale-95 transition-transform"
        >
          🏠 New Game
        </button>
      </div>
    </div>
  );
}

// ── ROOT COMPONENT ────────────────────────────────────────────────────────────
export default function Home() {
  const [screen, setScreen] = useState<Screen>('home');
  const [game, setGame] = useState<GameState | null>(null);
  const [setupData, setSetupData] = useState<{ players: string[]; categoryId: string; imposterCount: number } | null>(null);

  const startGame = useCallback((players: string[], categoryId: string, imposterCount: number) => {
    setSetupData({ players, categoryId, imposterCount });
    const category = CATEGORIES.find(c => c.id === categoryId)!;
    const word = getRandomWord(category);

    // Assign imposters randomly
    const shuffledNames = shuffle(players);
    const imposterNames = new Set(shuffledNames.slice(0, imposterCount));

    const playerObjs: Player[] = shuffle(
      players.map(name => ({
        id: generateId(),
        name,
        isImposter: imposterNames.has(name),
        hasViewed: false,
      }))
    );

    setGame({
      phase: 'reveal',
      players: playerObjs,
      categoryId,
      categoryName: category.name,
      word,
      imposterCount,
      currentRevealIndex: 0,
      revealedWord: false,
    });
    setScreen('reveal');
  }, []);

  const handleViewDone = useCallback(() => {
    setGame(prev => {
      if (!prev) return prev;
      return { ...prev, currentRevealIndex: prev.currentRevealIndex + 1 };
    });
  }, []);

  const handleAllViewed = useCallback(() => {
    setScreen('playing');
  }, []);

  const handleReveal = useCallback(() => {
    setScreen('result');
  }, []);

  const handlePlayAgain = useCallback(() => {
    if (!setupData) return;
    startGame(setupData.players, setupData.categoryId, setupData.imposterCount);
  }, [setupData, startGame]);

  const handleNewGame = useCallback(() => {
    setGame(null);
    setSetupData(null);
    setScreen('home');
  }, []);

  return (
    <>
      {screen === 'home' && <HomeScreen onStart={() => setScreen('setup')} />}
      {screen === 'setup' && <SetupScreen onPlay={startGame} />}
      {screen === 'reveal' && game && (
        <RevealScreen game={game} onViewDone={handleViewDone} onAllViewed={handleAllViewed} />
      )}
      {screen === 'playing' && game && (
        <PlayingScreen game={game} onReveal={handleReveal} onNewGame={handleNewGame} />
      )}
      {screen === 'result' && game && (
        <ResultScreen game={game} onPlayAgain={handlePlayAgain} onNewGame={handleNewGame} />
      )}
    </>
  );
}
