import { describe, expect, test } from 'vitest';

import { FormTool } from '../form';

const { filterOption, filterTreeNode } = FormTool;

describe('FormTool', () => {
  describe('filterOption', () => {
    test.each([
      [undefined, { label: 'Hello World' }, false],
      ['hello', { label: undefined }, false],
      ['hello', { label: 5 }, false],
      ['Hello', undefined, false],
      ['Hello', { label: 'Hello World' }, true],
      ['hello', { label: 'Hello world' }, true],
      ['World', { label: 'hello world' }, true],
      ['Hello ', { label: 'Hello world' }, true],
      ['h', { label: 'Hello world' }, true],
      ['w', { label: 'Hello world' }, true],
      ['long', { label: 'Hello world' }, false],
    ])('filterOption(%j, %j) -> %j', (input, option, expected) => {
      expect(filterOption(input, option)).toBe(expected);
    });
  });

  describe('filterTreeNode', () => {
    test.each([
      [undefined, { label: 'Hello World' }, false],
      ['Hello', undefined, false],
      ['hello', { label: undefined }, false],
      ['hello', { label: 5 }, false],
      ['Hello', { label: 'Hello World' }, true],
      ['hello', { label: 'Hello world' }, true],
      ['World', { label: 'hello world' }, true],
      ['Hello ', { label: 'Hello world' }, true],
      ['h', { label: 'Hello world' }, true],
      ['w', { label: 'Hello world' }, true],
      ['long', { label: 'Hello world' }, false],
    ])('filterOption(%j, %j) -> %j', (input, option, expected) => {
      expect(filterTreeNode(input, option)).toBe(expected);
    });
  });
});
