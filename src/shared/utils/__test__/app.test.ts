import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';

import { AppTool } from '../app';

const { scrollToTarget, scrollToTop } = AppTool;

describe('AppTool', () => {
  // Mock window and scrollTo before all tests
  beforeAll(() => {
    window.scrollTo = vi.fn();
  });

  // Clear the mock between tests
  beforeEach(() => {
    vi.clearAllMocks();
    document.body.innerHTML = ''; // Clear document body
  });

  describe('scrollToTop', () => {
    it('should scroll to top with default behavior', () => {
      scrollToTop();
      expect(window.scrollTo).toHaveBeenCalledWith({
        behavior: 'smooth',
        top: undefined,
      });
    });

    it('should scroll to specified top position', () => {
      scrollToTop(100);
      expect(window.scrollTo).toHaveBeenCalledWith({
        behavior: 'smooth',
        top: 100,
      });
    });
  });

  describe('scrollToTarget', () => {
    it('should scroll to the target element with an offset', () => {
      // Set up a mock element with a specific position
      const mockElement = document.createElement('div');
      mockElement.id = 'test-section';
      document.body.appendChild(mockElement);

      // Mock getBoundingClientRect to return a custom top value
      const elementRectMock = { top: 200 };
      vi.spyOn(mockElement, 'getBoundingClientRect').mockReturnValue(
        elementRectMock as DOMRect,
      );

      const bodyRectMock = { top: 20 };
      vi.spyOn(document.body, 'getBoundingClientRect').mockReturnValue(
        bodyRectMock as DOMRect,
      );

      // Call scrollToTarget
      scrollToTarget('test-section', 50);
      // Expect window.scrollTo to have been called with the correct calculated top
      expect(window.scrollTo).toHaveBeenCalledWith({
        behavior: 'smooth',
        top: 200 - 20 - 50, // elementPosition - offset
      });
    });

    it('should not scroll if the element is not found', () => {
      scrollToTarget('non-existent-section', 50);
      expect(window.scrollTo).not.toHaveBeenCalled();
    });
  });
});
