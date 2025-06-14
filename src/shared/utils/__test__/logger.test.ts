import { describe, expect, test } from 'vitest';

import { LoggerTool } from '../logger';

const { showError } = LoggerTool;

describe('LoggerTool', () => {
  describe('showError', () => {
    test('showError', () => {
      expect(showError('error')).toBe(undefined);
    });
  });
});
