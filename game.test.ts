
import { describe, it, expect } from 'vitest';
import { getRank } from './utils/gameLogic';
import { SeededRandom } from './utils/random';

describe('Game Logic', () => {
  it('should return correct rank based on score', () => {
    expect(getRank(0).label).toBe('D');
    expect(getRank(250).label).toBe('C');
    expect(getRank(600).label).toBe('B');
    expect(getRank(1200).label).toBe('A');
    expect(getRank(3000).label).toBe('S');
    expect(getRank(6000).label).toBe('S+');
  });
});

describe('SeededRandom', () => {
  it('should produce consistent numbers for the same seed', () => {
    const seed = 12345;
    const rng1 = new SeededRandom(seed);
    const rng2 = new SeededRandom(seed);
    
    expect(rng1.next()).toBe(rng2.next());
    expect(rng1.next()).toBe(rng2.next());
    expect(rng1.next()).toBe(rng2.next());
  });

  it('should produce different numbers for different seeds', () => {
    const rng1 = new SeededRandom(111);
    const rng2 = new SeededRandom(222);
    
    expect(rng1.next()).not.toBe(rng2.next());
  });
});
