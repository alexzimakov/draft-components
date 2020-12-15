import { uniqueId, resetIdCount } from './unique-id';

describe('#uniqueId()', () => {
  it('should generate unique IDs', () => {
    const id1 = uniqueId();
    const id2 = uniqueId();
    const pattern = /^\d+$/;

    expect(id1).toMatch(pattern);
    expect(id2).toMatch(pattern);
    expect(id1).not.toBe(id2);
  });

  it('should generate unique IDs with prefix', () => {
    const prefix = 'test-';
    const id1 = uniqueId(prefix);
    const id2 = uniqueId(prefix);
    const pattern = /^test-\d+$/;

    expect(id1).toMatch(pattern);
    expect(id2).toMatch(pattern);
    expect(id1).not.toBe(id2);
  });
});

describe('#resetIdCount()', () => {
  it('should reset id count', () => {
    resetIdCount();
    const id1 = uniqueId();
    resetIdCount();
    const id2 = uniqueId();

    expect(id1).toBe(id2);
  });
});
