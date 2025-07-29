import { beforeEach, describe, expect, it } from 'vitest';

import { ThemeTool } from '../theme';

const {
  checkIsRgbColor,
  componentToHex,
  getHexColorVariant,
  hexToRgb,
  rgbToHex,
  setWebIcon,
  setWebsiteTitle,
} = ThemeTool;

describe('ThemeTool', () => {
  describe('setWebsiteTitle', () => {
    it('should set document title to the specified title', () => {
      document.title = 'Initial Title';
      const newTitle = 'New Website Title';

      setWebsiteTitle(newTitle);
      expect(document.title).toBe(newTitle);
    });
  });

  describe('setWebIcon', () => {
    beforeEach(() => {
      const [head] = document.getElementsByTagName('head');

      const link = document.createElement('link');
      link.rel = 'icon';
      link.href = 'http://example.com/favicon.ico';
      head.appendChild(link);
    });

    it('should do nothing if no iconFileKey is provided', () => {
      const [head] = document.getElementsByTagName('head');

      setWebIcon();

      const iconElement = head.querySelector(
        "link[rel*='icon']",
      ) as HTMLLinkElement;

      expect(iconElement.href).toBe('http://example.com/favicon.ico');
    });

    it('should remove existing favicons and add a new one with https', () => {
      const [head] = document.getElementsByTagName('head');

      // Call the function with a new iconFileKey
      setWebIcon('http://newicon.com/favicon.ico');

      // Check that the existing favicon was removed
      expect(head.querySelectorAll("link[rel*='icon']").length).toBe(1);
      // Check the new favicon is set correctly
      const newIcon = head.querySelector(
        "link[rel*='icon']",
      ) as HTMLLinkElement;
      expect(newIcon).not.toBeNull();
      expect(newIcon?.href).toBe('https://newicon.com/favicon.ico');
    });
  });

  describe('componentToHex', () => {
    it('should convert number to hex correctly', () => {
      expect(componentToHex(0)).toBe('00');
      expect(componentToHex(255)).toBe('ff');
      expect(componentToHex(16)).toBe('10');
      expect(componentToHex(1)).toBe('01');
    });
  });

  describe('checkIsRgbColor', () => {
    it('should return true for valid RGB strings', () => {
      expect(checkIsRgbColor('rgb(255, 0, 0)')).toBe(true);
      expect(checkIsRgbColor('rgb(0, 255, 0)')).toBe(true);
      expect(checkIsRgbColor('rgb(0,  0, 255)')).toBe(true);
    });

    it('should return false for invalid RGB strings', () => {
      expect(checkIsRgbColor('rgba(255, 0, 0, 1)')).toBe(false);
      expect(checkIsRgbColor('rgb(255, -1, 0)')).toBe(false);
      expect(checkIsRgbColor('rgb(255, 0)')).toBe(false);
    });
  });

  describe('hexToRgb', () => {
    it('should convert hex to RGB correctly', () => {
      expect(hexToRgb('#ff0000')).toEqual({ b: 0, g: 0, r: 255 });
      expect(hexToRgb('#00ff00')).toEqual({ b: 0, g: 255, r: 0 });
      expect(hexToRgb('#0000ff')).toEqual({ b: 255, g: 0, r: 0 });
      expect(hexToRgb('ff0000')).toEqual({ b: 0, g: 0, r: 255 });
    });

    it('should return null for invalid hex values', () => {
      expect(hexToRgb('#xyz')).toBe(null);
      expect(hexToRgb('invalid')).toBe(null);
    });

    it('should convert RGB strings to RGB objects', () => {
      expect(hexToRgb('rgb(255, 0, 0)')).toEqual({ b: 0, g: 0, r: 255 });
      expect(hexToRgb('rgb(0, 255, 0)')).toEqual({ b: 0, g: 255, r: 0 });
    });

    it('should return null for invalid RGB strings', () => {
      expect(hexToRgb('rgb(255, -1, 0)')).toBe(null);
      expect(hexToRgb('rgb(255, 0)')).toBe(null);
    });
  });

  describe('rgbToHex', () => {
    it('should convert RGB to hex correctly', () => {
      expect(rgbToHex(255, 0, 0)).toBe('#ff0000');
      expect(rgbToHex(0, 255, 0)).toBe('#00ff00');
      expect(rgbToHex(0, 0, 255)).toBe('#0000ff');
      expect(rgbToHex(16, 16, 16)).toBe('#101010');
    });
  });

  describe('getHexColorVariant', () => {
    it('should lighten colors based on lightVolume', () => {
      expect(getHexColorVariant('#000000', 0.5)).toBe('#808080'); // Midway between black and white
      expect(getHexColorVariant('#ff0000', 0.5)).toBe('#ff8080'); // Lightened red
      expect(getHexColorVariant('#00ff00', 0.5)).toBe('#80ff80'); // Lightened green
      expect(getHexColorVariant('#0000ff', 0.5)).toBe('#8080ff'); // Lightened blue
    });

    it('should return lightVolume of black color if the color is invalid', () => {
      expect(getHexColorVariant('abc', 0.5)).toBe('#808080');
    });
  });
});
