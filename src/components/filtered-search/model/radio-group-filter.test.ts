import { expect, it } from 'vitest';
import { RadioGroupFilter } from './radio-group-filter.js';
import { describe } from 'node:test';

describe('isEmpty()', () => {
  it('returns true when filter has no value and options is a list of strings', () => {
    const filter = new RadioGroupFilter({
      type: RadioGroupFilter.Type,
      field: 'status',
      label: 'Status',
      options: ['todo', 'in_progress', 'done', 'archived'],
      operators: [
        RadioGroupFilter.Operators.equal,
        RadioGroupFilter.Operators.notEqual,
      ],
      operatorSelectAccessibleName: 'Status filter operator',
    }, {
      value: '',
      operator: RadioGroupFilter.Operators.equal,
    });
    expect(filter.isEmpty()).toBe(true);
  });

  it('returns true when filter has no value and options is a list of objects', () => {
    const filter = new RadioGroupFilter({
      type: RadioGroupFilter.Type,
      field: 'status',
      label: 'Status',
      options: [
        { value: 'todo', label: 'To Do' },
        { value: 'in_progress', label: 'In Progress' },
        { value: 'done', label: 'Done' },
        { value: 'archived', label: 'Archived' },
      ],
      operators: [
        RadioGroupFilter.Operators.equal,
        RadioGroupFilter.Operators.notEqual,
      ],
      operatorSelectAccessibleName: 'Status filter operator',
    }, {
      value: '',
      operator: RadioGroupFilter.Operators.equal,
    });
    expect(filter.isEmpty()).toBe(true);
  });

  it('returns false when filter has value and options is a list of strings', () => {
    const filter = new RadioGroupFilter({
      type: RadioGroupFilter.Type,
      field: 'status',
      label: 'Status',
      options: ['todo', 'in_progress', 'done', 'archived'],
      operators: [
        RadioGroupFilter.Operators.equal,
        RadioGroupFilter.Operators.notEqual,
      ],
      operatorSelectAccessibleName: 'Status filter operator',
    }, {
      value: 'done',
      operator: RadioGroupFilter.Operators.equal,
    });
    expect(filter.isEmpty()).toBe(false);
  });

  it('returns false when filter has value and options is a list of objects', () => {
    const filter = new RadioGroupFilter({
      type: RadioGroupFilter.Type,
      field: 'status',
      label: 'Status',
      options: [
        { value: 'todo', label: 'To Do' },
        { value: 'in_progress', label: 'In Progress' },
        { value: 'done', label: 'Done' },
        { value: 'archived', label: 'Archived' },
      ],
      operators: [
        RadioGroupFilter.Operators.equal,
        RadioGroupFilter.Operators.notEqual,
      ],
      operatorSelectAccessibleName: 'Status filter operator',
    }, {
      value: 'done',
      operator: RadioGroupFilter.Operators.equal,
    });
    expect(filter.isEmpty()).toBe(false);
  });
});
