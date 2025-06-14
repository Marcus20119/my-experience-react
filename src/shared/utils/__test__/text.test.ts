import { describe, expect, test } from 'vitest';

import { TextTool } from '../text';

const { getGoogleMapUrl, getMailToUrl, getPhoneCallUrl, getSlug, latinize } =
  TextTool;

describe('TextTool', () => {
  describe('getGoogleMapUrl', () => {
    test.each([
      [1.05, -2.36, 'https://www.google.com/maps?q=1.05,-2.36'],
      [undefined, undefined, ''],
      [null, null, ''],
      [undefined, null, ''],
      [null, undefined, ''],
      [1.05, undefined, ''],
      [undefined, -2.36, ''],
      [null, -2.36, ''],
      [1.05, null, ''],
      [1.05, undefined, ''],
    ])('getGoogleMapUrl(%j, %j) -> %s', (latitude, longitude, expected) => {
      expect(getGoogleMapUrl(latitude, longitude)).toBe(expected);
    });
  });

  describe('getMailToUrl', () => {
    test.each([
      ['test@gmail.com', 'mailto:test@gmail.com'],
      [undefined, ''],
      [null, ''],
    ])("getMailToUrl(%j) -> ''", (email, expected) => {
      expect(getMailToUrl(email)).toBe(expected);
    });
  });

  describe('getPhoneCallUrl', () => {
    test.each([
      ['+123456789', 'tel:+123456789'],
      [undefined, ''],
      [null, ''],
    ])('getPhoneCallUrl(%j) -> %s', (phoneNumber, expected) => {
      expect(getPhoneCallUrl(phoneNumber)).toBe(expected);
    });
  });

  describe('getSlug', () => {
    test.each([
      ['Hello World', 'hello-world'],
      ['Nguyễn Hữu Hoàng Long', 'nguyen-huu-hoang-long'],
      ['je suis en très bonne santé', 'je-suis-en-tres-bonne-sante'],
      [undefined, ''],
      [null, ''],
    ])('getSlug(%j) -> %s', (str, expected) => {
      expect(getSlug(str)).toBe(expected);
    });
  });

  describe('latinize', () => {
    test.each([
      ['Hello World', 'Hello World'],
      ['Nguyễn Hữu Hoàng Long', 'Nguyen Huu Hoang Long'],
      ['je suis en très bonne santé', 'je suis en tres bonne sante'],
      [undefined, ''],
      [null, ''],
    ])('latinize(%j) -> %s', (str, expected) => {
      expect(latinize(str)).toBe(expected);
    });
  });
});
