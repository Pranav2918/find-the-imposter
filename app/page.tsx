'use client';

import { useCallback, useEffect, useState } from 'react';
import { CATEGORIES, getRandomWord } from '@/lib/categories';
import { GameState, Player } from '@/lib/types';

type Screen = 'home' | 'setup' | 'reveal' | 'playing' | 'result';
type InstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
};

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

function InstallButton() {
  const [installPrompt, setInstallPrompt] = useState<InstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const standalone = window.matchMedia('(display-mode: standalone)');
    const updateInstalled = () => setIsInstalled(standalone.matches);
    const handleInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event as InstallPromptEvent);
    };
    const handleInstalled = () => {
      setIsInstalled(true);
      setInstallPrompt(null);
    };

    updateInstalled();
    standalone.addEventListener('change', updateInstalled);
    window.addEventListener('beforeinstallprompt', handleInstallPrompt);
    window.addEventListener('appinstalled', handleInstalled);

    return () => {
      standalone.removeEventListener('change', updateInstalled);
      window.removeEventListener('beforeinstallprompt', handleInstallPrompt);
      window.removeEventListener('appinstalled', handleInstalled);
    };
  }, []);

  const install = async () => {
    if (!installPrompt) return;
    await installPrompt.prompt();
    await installPrompt.userChoice;
    setInstallPrompt(null);
  };

  if (isInstalled) {
    return <span className="installed-badge"><span aria-hidden="true">✓</span> Installed</span>;
  }

  if (installPrompt) {
    return (
      <button className="install-button" onClick={install} type="button">
        <span aria-hidden="true">↓</span> Install app
      </button>
    );
  }

  return (
    <details className="install-help">
      <summary className="install-button"><span aria-hidden="true">↓</span> Install app</summary>
      <div className="install-help-panel">
        <strong>Take the game with you</strong>
        <p>On iPhone or iPad, tap Share, then “Add to Home Screen”. On Android, open your browser menu and choose “Install app” or “Add to Home screen”.</p>
      </div>
    </details>
  );
}

function Header({
  onHome,
  onRestart,
  onExit,
  inGame,
}: {
  onHome: () => void;
  onRestart: () => void;
  onExit: () => void;
  inGame: boolean;
}) {
  return (
    <header className="app-header">
      <button className="brand" onClick={onHome} type="button" aria-label="Go to home">
        <span className="brand-icon" aria-hidden="true">🕵️</span>
        <span>imposter<span className="brand-period">.</span></span>
      </button>
      <div className="header-actions">
        {inGame && (
          <>
            <button className="game-action-button" onClick={onRestart} type="button">
              <span aria-hidden="true">↻</span> Restart round
            </button>
            <button className="game-action-button game-exit-button" onClick={onExit} type="button">
              <span aria-hidden="true">←</span> Exit game
            </button>
          </>
        )}
        {!inGame && <InstallButton />}
      </div>
    </header>
  );
}

function HomeScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="home-screen">
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow"><span className="live-dot" /> THE PARTY GAME FOR EVERYONE</span>
          <h1>One word.<br /><span>One imposter.</span><br />Zero trust.</h1>
          <p>Pass the phone, share a secret word, and figure out who&apos;s bluffing. Let the chaos begin.</p>
          <button className="button button-primary hero-cta" onClick={onStart} type="button">
            Set up a game <span aria-hidden="true">↗</span>
          </button>
          <div className="hero-meta">
            <span><strong>3–12</strong> players</span>
            <span className="meta-divider" />
            <span><strong>5 min</strong> to play</span>
            <span className="meta-divider" />
            <span><strong>100%</strong> suspicion</span>
          </div>
        </div>
        <div className="hero-art" aria-label="A detective magnifying glass illustration">
          <div className="art-orbit orbit-one" />
          <div className="art-orbit orbit-two" />
          <span className="art-spark spark-one">✳</span>
          <span className="art-spark spark-two">✦</span>
          <div className="detective-card">
            <span className="detective-emoji" aria-hidden="true">🕵️</span>
            <span className="detective-stamp">CASE<br />NO. 001</span>
          </div>
          <div className="clue-card clue-card-top"><span>THE WORD</span><strong>?</strong></div>
          <div className="clue-card clue-card-bottom"><span>THE SUSPECT</span><strong>Among us</strong></div>
        </div>
      </section>

      <section className="how-section">
        <div className="section-heading">
          <span className="eyebrow">QUICK BRIEFING</span>
          <h2>Trust no one.<br /><span>Especially your friends.</span></h2>
        </div>
        <div className="steps-grid">
          <article className="step-card"><span className="step-number">01</span><span className="step-icon">👥</span><h3>Gather your crew</h3><p>Add 3–12 players. The more suspicious, the better.</p></article>
          <article className="step-card"><span className="step-number">02</span><span className="step-icon">🤫</span><h3>Keep it secret</h3><p>Pass the phone. Everyone gets the word… except the imposter.</p></article>
          <article className="step-card"><span className="step-number">03</span><span className="step-icon">🗳️</span><h3>Call their bluff</h3><p>Drop clues, discuss, vote, and reveal who fooled you.</p></article>
        </div>
      </section>
      <footer className="app-footer"><span>Made for suspicious friend groups.</span><span>Desi edition <span aria-hidden="true">✳</span></span></footer>
    </div>
  );
}

function SetupScreen({
  onPlay,
  onCancel,
}: {
  onPlay: (players: string[], categoryIds: string[], imposterCount: number) => void;
  onCancel: () => void;
}) {
  const [names, setNames] = useState<string[]>(['', '', '']);
  const [categoryIds, setCategoryIds] = useState<string[]>([CATEGORIES[0].id]);
  const [imposterCount, setImposterCount] = useState(1);
  const [error, setError] = useState('');

  const addPlayer = () => {
    if (names.length < 12) setNames([...names, '']);
  };

  const removePlayer = (index: number) => {
    if (names.length > 3) setNames(names.filter((_, i) => i !== index));
  };

  const updateName = (index: number, value: string) => {
    setNames(names.map((name, i) => i === index ? value : name));
  };

  const toggleCategory = (categoryId: string) => {
    setCategoryIds(current => current.includes(categoryId)
      ? current.filter(id => id !== categoryId)
      : [...current, categoryId]);
    setError('');
  };

  const handleStart = () => {
    const filled = names.map(name => name.trim()).filter(Boolean);
    if (filled.length < 3) { setError('Add at least 3 player names to start.'); return; }
    if (new Set(filled.map(name => name.toLocaleLowerCase())).size !== filled.length) {
      setError('Each player needs a different name.'); return;
    }
    if (categoryIds.length === 0) { setError('Choose at least one category.'); return; }
    if (imposterCount >= filled.length) { setError('You need more players than imposters.'); return; }
    setError('');
    onPlay(filled, categoryIds, imposterCount);
  };

  return (
    <div className="setup-page">
      <div className="setup-heading">
        <button className="text-button" onClick={onCancel} type="button"><span aria-hidden="true">←</span> Back</button>
        <span className="eyebrow">BEFORE THE MYSTERY</span>
        <h1>Build your crew<span>.</span></h1>
        <p>Pick your players, then choose what everyone knows.</p>
      </div>

      <section className="setup-section">
        <div className="section-title-row">
          <div><span className="section-kicker">01 / THE PLAYERS</span><h2>Your crew</h2></div>
          <span className="count-pill">{names.length} / 12</span>
        </div>
        <div className="player-list">
          {names.map((name, i) => (
            <label className="player-row" key={i}>
              <span className="player-index">{String(i + 1).padStart(2, '0')}</span>
              <input
                aria-label={`Player ${i + 1} name`}
                type="text"
                placeholder={`Player ${i + 1}`}
                value={name}
                onChange={event => updateName(i, event.target.value)}
                maxLength={20}
              />
              {names.length > 3 && <button className="remove-player" onClick={() => removePlayer(i)} type="button" aria-label={`Remove player ${i + 1}`}>×</button>}
            </label>
          ))}
        </div>
        {names.length < 12 && <button className="add-player" onClick={addPlayer} type="button"><span aria-hidden="true">＋</span> Add another player</button>}
      </section>

      <section className="setup-section">
        <div className="section-title-row">
          <div><span className="section-kicker">02 / THE SUBJECT</span><h2>Pick your categories</h2></div>
          <span className="count-pill">{categoryIds.length} selected</span>
        </div>
        <p className="section-hint">Choose one or more. We&apos;ll pick a category for each round.</p>
        <div className="category-grid">
          {CATEGORIES.map(category => {
            const selected = categoryIds.includes(category.id);
            return (
              <button
                aria-pressed={selected}
                className={`category-card${selected ? ' is-selected' : ''}`}
                key={category.id}
                onClick={() => toggleCategory(category.id)}
                type="button"
              >
                <span className="category-emoji" aria-hidden="true">{category.emoji}</span>
                <span className="category-name">{category.name}</span>
                <span className="category-check" aria-hidden="true">{selected ? '✓' : '+'}</span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="setup-section imposter-section">
        <div className="section-title-row">
          <div><span className="section-kicker">03 / THE WILDCARDS</span><h2>Choose your imposters</h2></div>
          <span className="imposter-icon" aria-hidden="true">😈</span>
        </div>
        <div className="choice-row">
          {[1, 2].map(count => (
            <button
              aria-pressed={imposterCount === count}
              className={`choice-card${imposterCount === count ? ' is-selected' : ''}`}
              key={count}
              onClick={() => setImposterCount(count)}
              type="button"
            >
              <span className="choice-count">{count}</span>
              <span>{count === 1 ? 'Imposter' : 'Imposters'}</span>
              <span className="choice-radio" aria-hidden="true">{imposterCount === count ? '●' : '○'}</span>
            </button>
          ))}
        </div>
      </section>

      {error && <p className="form-error" role="alert"><span aria-hidden="true">!</span> {error}</p>}
      <button className="button button-primary start-round" onClick={handleStart} type="button">
        Start the round <span aria-hidden="true">↗</span>
      </button>
      <p className="privacy-note"><span aria-hidden="true">🔒</span> Your secret stays on this device.</p>
    </div>
  );
}

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

  const handleDone = () => {
    setShown(false);
    if (isLast) onAllViewed();
    else onViewDone();
  };

  return (
    <div className="game-page reveal-page">
      <div className="game-card reveal-card">
        <div className="game-progress-label"><span>SECRET CHECK</span><span>{String(game.currentRevealIndex + 1).padStart(2, '0')} / {String(game.players.length).padStart(2, '0')}</span></div>
        <div className="progress-track" aria-label={`Player ${game.currentRevealIndex + 1} of ${game.players.length}`}>
          <span style={{ width: `${((game.currentRevealIndex + 1) / game.players.length) * 100}%` }} />
        </div>
        <span className="eyebrow">PASS THE PHONE</span>
        <h1>Your turn,<br /><span>{current.name}.</span></h1>
        {!shown ? (
          <>
            <p className="game-copy">Make sure nobody else is looking. Your secret is for your eyes only.</p>
            <button className="secret-card secret-card-hidden" onClick={() => setShown(true)} type="button">
              <span className="secret-card-mark" aria-hidden="true">✳</span>
              <strong>Tap to reveal</strong>
              <span>Keep it under wraps</span>
            </button>
          </>
        ) : (
          <>
            <div className={`secret-card ${current.isImposter ? 'secret-card-imposter' : 'secret-card-word'}`}>
              <span className="secret-card-mark" aria-hidden="true">{current.isImposter ? '😈' : '🔑'}</span>
              <span className="secret-label">{current.isImposter ? 'YOUR COVER STORY' : 'THE SECRET WORD'}</span>
              <strong>{current.isImposter ? 'You are the imposter' : game.word}</strong>
              <span>{current.isImposter ? 'Blend in. Bluff well. Good luck.' : 'Give clues, but don’t make it obvious.'}</span>
            </div>
            <button className="button button-primary full-button" onClick={handleDone} type="button">
              {isLast ? 'Everyone is ready' : 'Pass to the next player'} <span aria-hidden="true">→</span>
            </button>
          </>
        )}
        <div className="pass-note"><span aria-hidden="true">☝</span> Only {current.name} should look at the screen</div>
      </div>
    </div>
  );
}

function PlayingScreen({ game, onReveal, onNewGame }: { game: GameState; onReveal: () => void; onNewGame: () => void }) {
  const [confirmReveal, setConfirmReveal] = useState(false);
  const category = CATEGORIES.find(item => item.id === game.categoryId);

  return (
    <div className="game-page">
      <div className="game-card">
        <span className="eyebrow"><span className="live-dot" /> THE DISCUSSION IS LIVE</span>
        <div className="playing-heading">
          <span className="playing-emoji" aria-hidden="true">{category?.emoji ?? '🎭'}</span>
          <div><span className="section-kicker">THIS ROUND&apos;S CATEGORY</span><h1>{category?.name ?? game.categoryName}</h1></div>
        </div>
        <p className="game-copy">Share one-word clues. The imposter is listening — and trying to sound like they belong.</p>

        <section className="game-panel">
          <div className="panel-heading"><h2>The players</h2><span className="count-pill">{game.players.length} in the room</span></div>
          <div className="player-chip-list">{game.players.map((player, i) => <span className="player-chip" key={player.id}><span className="chip-number">{String(i + 1).padStart(2, '0')}</span>{player.name}</span>)}</div>
        </section>
        <section className="game-panel reminder-panel">
          <span className="reminder-mark" aria-hidden="true">✳</span>
          <div><h2>Keep your clues clever</h2><p>No saying the word out loud. Discuss, debate, and vote when the group is ready.</p></div>
        </section>

        {!confirmReveal ? (
          <button className="button button-danger full-button" onClick={() => setConfirmReveal(true)} type="button">Reveal the imposter <span aria-hidden="true">↗</span></button>
        ) : (
          <div className="confirm-panel" role="group" aria-label="Confirm reveal">
            <p>Everyone voted? This reveals the secret word, too.</p>
            <div className="confirm-actions">
              <button className="button button-secondary" onClick={() => setConfirmReveal(false)} type="button">Keep playing</button>
              <button className="button button-danger" onClick={onReveal} type="button">Reveal now</button>
            </div>
          </div>
        )}
        <button className="text-button restart-button" onClick={onNewGame} type="button">End this round</button>
      </div>
    </div>
  );
}

function ResultScreen({ game, onPlayAgain, onNewGame }: { game: GameState; onPlayAgain: () => void; onNewGame: () => void }) {
  const imposters = game.players.filter(player => player.isImposter);
  const crewmates = game.players.filter(player => !player.isImposter);
  const category = CATEGORIES.find(item => item.id === game.categoryId);

  return (
    <div className="game-page result-page">
      <div className="game-card result-card">
        <span className="eyebrow">CASE CLOSED</span>
        <span className="result-stamp" aria-hidden="true">✳</span>
        <h1>Caught in<br /><span>the act.</span></h1>
        <p className="game-copy">The truth is out. Were your suspicions right?</p>

        <section className="reveal-panel imposter-panel">
          <span className="section-kicker">THE IMPOSTER{imposters.length > 1 ? 'S' : ''}</span>
          <div className="result-names">{imposters.map(player => <span className="result-name" key={player.id}>😈 {player.name}</span>)}</div>
        </section>
        <section className="reveal-panel word-panel">
          <span className="section-kicker">{category?.emoji ?? '🔑'} THE SECRET WORD · {category?.name ?? game.categoryName}</span>
          <strong>{game.word}</strong>
        </section>
        <section className="crew-summary">
          <span className="section-kicker">THE REST OF THE CREW</span>
          <div>{crewmates.map(player => <span className="crew-name" key={player.id}>{player.name}</span>)}</div>
        </section>

        <button className="button button-primary full-button" onClick={onPlayAgain} type="button">Play another round <span aria-hidden="true">↗</span></button>
        <button className="text-button restart-button" onClick={onNewGame} type="button">Start a new game</button>
      </div>
    </div>
  );
}

export default function Home() {
  const [screen, setScreen] = useState<Screen>('home');
  const [game, setGame] = useState<GameState | null>(null);
  const [setupData, setSetupData] = useState<{ players: string[]; categoryIds: string[]; imposterCount: number } | null>(null);
  const [pendingAction, setPendingAction] = useState<'restart' | 'exit' | null>(null);

  const startGame = useCallback((players: string[], categoryIds: string[], imposterCount: number, previousGame?: GameState) => {
    setSetupData({ players, categoryIds, imposterCount });
    const availableCategories = CATEGORIES.filter(category => categoryIds.includes(category.id));
    const alternateCategories = availableCategories.filter(category => category.id !== previousGame?.categoryId);
    const categoryPool = alternateCategories.length > 0 ? alternateCategories : availableCategories;
    const category = categoryPool[Math.floor(Math.random() * categoryPool.length)];
    const availableWords = category.id === previousGame?.categoryId
      ? category.words.filter(word => word !== previousGame.word)
      : category.words;
    const word = availableWords.length > 0
      ? availableWords[Math.floor(Math.random() * availableWords.length)]
      : getRandomWord(category);
    const imposterNames = new Set(shuffle(players).slice(0, imposterCount));
    const playerObjs: Player[] = shuffle(players.map(name => ({
      id: generateId(),
      name,
      isImposter: imposterNames.has(name),
      hasViewed: false,
    })));

    setGame({
      phase: 'reveal',
      players: playerObjs,
      categoryId: category.id,
      categoryName: category.name,
      word,
      imposterCount,
      currentRevealIndex: 0,
      revealedWord: false,
    });
    setScreen('reveal');
  }, []);

  const handleViewDone = useCallback(() => {
    setGame(previous => previous ? { ...previous, currentRevealIndex: previous.currentRevealIndex + 1 } : previous);
  }, []);
  const handlePlayAgain = useCallback(() => {
    if (setupData && game) startGame(setupData.players, setupData.categoryIds, setupData.imposterCount, game);
  }, [game, setupData, startGame]);
  const handleNewGame = useCallback(() => {
    setGame(null);
    setSetupData(null);
    setPendingAction(null);
    setScreen('home');
  }, []);

  const confirmPendingAction = () => {
    const action = pendingAction;
    setPendingAction(null);
    if (action === 'restart') handlePlayAgain();
    if (action === 'exit') handleNewGame();
  };

  return (
    <main className="app-shell">
      <Header
        onHome={screen === 'reveal' || screen === 'playing' || screen === 'result' ? () => setPendingAction('exit') : handleNewGame}
        onRestart={() => setPendingAction('restart')}
        onExit={() => setPendingAction('exit')}
        inGame={screen === 'reveal' || screen === 'playing' || screen === 'result'}
      />
      {screen === 'home' && <HomeScreen onStart={() => setScreen('setup')} />}
      {screen === 'setup' && <SetupScreen onPlay={startGame} onCancel={handleNewGame} />}
      {screen === 'reveal' && game && <RevealScreen game={game} onViewDone={handleViewDone} onAllViewed={() => setScreen('playing')} />}
      {screen === 'playing' && game && <PlayingScreen game={game} onReveal={() => setScreen('result')} onNewGame={() => setPendingAction('exit')} />}
      {screen === 'result' && game && <ResultScreen game={game} onPlayAgain={handlePlayAgain} onNewGame={() => setPendingAction('exit')} />}
      {pendingAction && (
        <div className="dialog-backdrop">
          <section className="action-dialog" role="alertdialog" aria-modal="true" aria-labelledby="action-dialog-title" aria-describedby="action-dialog-description">
            <span className="dialog-icon" aria-hidden="true">{pendingAction === 'restart' ? '↻' : '←'}</span>
            <span className="section-kicker">{pendingAction === 'restart' ? 'NEW ROUND' : 'LEAVE THE GAME'}</span>
            <h2 id="action-dialog-title">{pendingAction === 'restart' ? 'Deal a fresh round?' : 'Exit to the home screen?'}</h2>
            <p id="action-dialog-description">
              {pendingAction === 'restart'
                ? 'Same crew and category choices, with a different category or secret word.'
                : 'Your current round will end. You can always set up another game.'}
            </p>
            <div className="dialog-actions">
              <button className="button button-secondary" onClick={() => setPendingAction(null)} type="button">Keep playing</button>
              <button className={`button ${pendingAction === 'restart' ? 'button-primary' : 'button-danger'}`} onClick={confirmPendingAction} type="button">
                {pendingAction === 'restart' ? 'Restart round' : 'Exit game'}
              </button>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
