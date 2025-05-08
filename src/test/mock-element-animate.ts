import { vi } from 'vitest';

export function mockElementAnimate() {
  Element.prototype.animate = vi.fn().mockImplementation(() => ({
    currentTime: 0,
    pending: false,
    effect: null,
    startTime: null,
    finished: Promise.resolve(),
    ready: Promise.resolve(),
    playState: 'finished',
    playbackRate: -1,
    replaceState: 'active',
    timeline: document.timeline,
    cancel: vi.fn(),
    commitStyles: vi.fn(),
    finish: vi.fn(),
    pause: vi.fn(),
    persist: vi.fn(),
    play: vi.fn(),
    reverse: vi.fn(),
    updatePlaybackRate: vi.fn(),
  }));
}
