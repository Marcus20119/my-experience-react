import { describe, expect, test, vi } from 'vitest';

import { DEFAULT_CURRENCY_UNIT } from '@/shared/constants';

import { NumberTool } from '../number';

vi.mock('@/shared/stores');

const {
  formatMoney,
  formatNumber,
  formatRangeMoney,
  formatterInputNumber,
  parserInputNumber,
  roundMoney,
  roundNumber,
} = NumberTool;

describe('NumberTool', () => {
  describe('formatterInputNumber', () => {
    test.each([
      [undefined, ''],
      [null, ''],
      ['', ''],
      ['123456', '123,456'],
      ['1234567', '1,234,567'],
      ['12345678', '12,345,678'],
      [123456, '123,456'],
      [1234567, '1,234,567'],
      [12345678, '12,345,678'],
    ])('formatterInputNumber(%j) -> %s', (value, expected) => {
      expect(formatterInputNumber(value)).toBe(expected);
    });
  });

  describe('parserInputNumber', () => {
    test.each([
      [undefined, ''],
      [null, ''],
      ['', ''],
      ['123,456', '123456'],
      ['1,234,567', '1234567'],
      ['12,345,678', '12345678'],
    ])('parserInputNumber(%j) -> %s', (value, expected) => {
      expect(parserInputNumber(value)).toBe(expected);
    });
  });

  describe('formatNumber', () => {
    test.each([
      [undefined, undefined, ''],
      [null, undefined, ''],
      ['', undefined, ''],
      ['123456', undefined, '123,456'],
      ['1234567', undefined, '1,234,567'],
      ['12345678', undefined, '12,345,678'],
      [123456, undefined, '123,456'],
      [1234567, undefined, '1,234,567'],
      [12345678, undefined, '12,345,678'],
      [undefined, 2, ''],
      [null, 2, ''],
      ['', 2, ''],
      ['123456', 2, '12,34,56'],
      ['1234567', 2, '1,23,45,67'],
      ['12345678', 2, '12,34,56,78'],
      [123456, 2, '12,34,56'],
      [1234567, 2, '1,23,45,67'],
      [12345678, 2, '12,34,56,78'],
    ])('formatMoney(%j, %d) -> %s', (value, digit, expected) => {
      expect(formatNumber(value, digit)).toBe(expected);
    });
  });

  describe('formatMoney', () => {
    test.each([
      [undefined, '0'],
      [null, '0'],
      ['', '0'],
      ['123456', '123,456'],
      ['1234567', '1,234,567'],
      ['12345678', '12,345,678'],
      [123456, '123,456'],
      [1234567, '1,234,567'],
      [12345678, '12,345,678'],
    ])('formatMoney(%j) -> %s', (value, expected) => {
      expect(formatMoney(value)).toBe(`${DEFAULT_CURRENCY_UNIT} ${expected}`);
    });
  });

  describe('roundNumber', () => {
    test.each([
      [undefined, undefined, '0'],
      [null, undefined, '0'],
      ['', undefined, '0'],
      ['123456.123', 2, '123456.12'],
      ['123456.567', 2, '123456.57'],
      [123456.123, 2, '123456.12'],
      [123456.567, 2, '123456.57'],
      ['123456.123', 1, '123456.1'],
      ['123456.567', 1, '123456.6'],
      [123456.123, 1, '123456.1'],
      [123456.567, 1, '123456.6'],
    ])('roundNumber(%j, %d) -> %s', (value, digit, expected) => {
      expect(roundNumber(value, digit)).toBe(expected);
    });
  });

  describe('roundMoney', () => {
    test.each([
      [undefined, '0'],
      [null, '0'],
      ['', '0'],
      [0, '0'],
    ])("roundMoney(Falsy input)) -> '0'", (value, expected) => {
      expect(roundMoney(value)).toBe(expected);
    });

    test.each([
      [-1, '0'],
      ['1234', '1.2K'],
      [1234, '1.2K'],
      ['1234567', '1.2M'],
      [1234567, '1.2M'],
    ])('roundMoney(%j) -> %s, en', async (value, expected) => {
      const { useLocalStore } = await import('@/shared/stores');
      useLocalStore.getState = vi.fn().mockReturnValue({
        language: 'en',
      });
      expect(roundMoney(value)).toBe(expected);
    });

    test.each([
      [-1, '0'],
      ['1234', '1.2k'],
      [1234, '1.2k'],
      ['1234567', '1.2tr'],
      [1234567, '1.2tr'],
    ])('roundMoney(%j) -> %s, vi', async (value, expected) => {
      const { useLocalStore } = await import('@/shared/stores');
      useLocalStore.getState = vi.fn().mockReturnValue({
        language: 'vi',
      });
      expect(roundMoney(value)).toBe(expected);

      useLocalStore.getState = vi.fn().mockReturnValue({
        language: undefined,
      });
      expect(roundMoney(value)).toBe(expected);
    });
  });

  describe('formatRangeMoney', () => {
    test.each([
      [undefined, undefined],
      [null, null],
      ['', ''],
      [0, 0],
      ['abc', 'def'],
    ])('formatRangeMoney(Falsy input)', (minPrice, maxPrice) => {
      expect(formatRangeMoney(minPrice, maxPrice)).toBe(
        `${DEFAULT_CURRENCY_UNIT} 0`,
      );
    });

    test.each([
      [1234, 1234, '1.2K'],
      [1234, 12345, '1.2K - 12.3K'],
      [1234567, 1234567, '1.2M'],
      [1234567, 12345678, '1.2M - 12.3M'],
      [1234, 1234567, '1.2K - 1.2M'],
    ])(
      'formatRangeMoney(%j, %j) -> %s',
      async (minPrice, maxPrice, expected) => {
        const { useLocalStore } = await import('@/shared/stores');
        useLocalStore.getState = vi.fn().mockReturnValue({
          language: 'en',
        });
        expect(formatRangeMoney(minPrice, maxPrice)).toBe(
          `${DEFAULT_CURRENCY_UNIT} ${expected}`,
        );
      },
    );
  });
});
