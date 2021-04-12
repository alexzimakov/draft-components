export class Stack<T> {
  private readonly _items: T[];

  constructor(items: T[] = []) {
    this._items = items;
  }

  get last(): T | undefined {
    return this._items[this._items.length - 1];
  }

  get count(): number {
    return this._items.length;
  }

  get isEmpty(): boolean {
    return !this.count;
  }

  push(item: T) {
    this._items.push(item);
  }

  pop(): T | undefined {
    return this._items.pop();
  }

  remove(item: T): T | undefined {
    const itemIndex = this._items.lastIndexOf(item);
    if (~itemIndex) {
      const [item] = this._items.splice(itemIndex, 1);
      return item;
    }
  }

  isLast(item: T): boolean {
    return this.last === item;
  }
}
