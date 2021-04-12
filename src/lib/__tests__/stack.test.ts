import { Stack } from '../stack';

it('should return the number of stack items', () => {
  const stack = new Stack([1, 2, 3]);
  expect(stack.count).toBe(3);
});

it('should return true when stack is empty', () => {
  const stack = new Stack();
  expect(stack.isEmpty).toBe(true);
});

it('should push item to stack', () => {
  const stack = new Stack<number>();
  stack.push(1);
  expect(stack.count).toBe(1);
});

it('should pop item from stack', () => {
  const stack = new Stack([1, 2]);
  expect(stack.pop()).toBe(2);
  expect(stack.pop()).toBe(1);
  expect(stack.pop()).toBeUndefined();
  expect(stack.count).toBe(0);
});

it('should remove item from stack', () => {
  const stack = new Stack([1, 2]);
  expect(stack.remove(2)).toBe(2);
  expect(stack.remove(22)).toBeUndefined();
  expect(stack.count).toBe(1);
});

it('should return number of items in the stack', () => {
  const stack = new Stack([1, 2, 3]);
  expect(stack.count).toBe(3);
});

it('should return true if the item is last in the stack and false otherwise', () => {
  const stack = new Stack([1, 2, 3]);
  expect(stack.isLast(3)).toBe(true);
  expect(stack.isLast(1)).toBe(false);
});

it('should return the last item in the stack', () => {
  const stack = new Stack([1, 2, 3]);
  expect(stack.last).toBe(3);
});
