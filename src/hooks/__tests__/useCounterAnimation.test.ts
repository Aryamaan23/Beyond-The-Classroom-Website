import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useCounterAnimation } from '../useCounterAnimation';

describe('useCounterAnimation Hook', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Basic Functionality', () => {
    it('should start at 0 when not started', () => {
      const { result } = renderHook(() => useCounterAnimation(100, 2000, false));
      expect(result.current).toBe(0);
    });

    it('should animate to target value when started', async () => {
      const { result, rerender } = renderHook(
        ({ end, duration, start }) => useCounterAnimation(end, duration, start),
        { initialProps: { end: 100, duration: 2000, start: false } }
      );

      expect(result.current).toBe(0);

      // Start animation
      rerender({ end: 100, duration: 2000, start: true });

      // Fast-forward time
      vi.advanceTimersByTime(2000);

      await waitFor(() => {
        expect(result.current).toBe(100);
      });
    });

    it('should animate to different target values', async () => {
      const { result, rerender } = renderHook(
        ({ end, duration, start }) => useCounterAnimation(end, duration, start),
        { initialProps: { end: 50, duration: 1000, start: true } }
      );

      vi.advanceTimersByTime(1000);

      await waitFor(() => {
        expect(result.current).toBe(50);
      });

      // Change target
      rerender({ end: 200, duration: 1000, start: true });
      vi.advanceTimersByTime(1000);

      await waitFor(() => {
        expect(result.current).toBe(200);
      });
    });
  });

  describe('Animation Duration', () => {
    it('should use default duration of 2000ms', async () => {
      const { result, rerender } = renderHook(
        ({ start }) => useCounterAnimation(100, undefined, start),
        { initialProps: { start: false } }
      );

      rerender({ start: true });

      // Should not be complete at 1000ms
      vi.advanceTimersByTime(1000);
      await waitFor(() => {
        expect(result.current).toBeLessThan(100);
      });

      // Should be complete at 2000ms
      vi.advanceTimersByTime(1000);
      await waitFor(() => {
        expect(result.current).toBe(100);
      });
    });

    it('should respect custom duration', async () => {
      const { result, rerender } = renderHook(
        ({ start }) => useCounterAnimation(100, 500, start),
        { initialProps: { start: false } }
      );

      rerender({ start: true });

      vi.advanceTimersByTime(500);

      await waitFor(() => {
        expect(result.current).toBe(100);
      });
    });
  });

  describe('Animation Progress', () => {
    it('should increment gradually during animation', async () => {
      const { result, rerender } = renderHook(
        ({ start }) => useCounterAnimation(100, 1000, start),
        { initialProps: { start: false } }
      );

      rerender({ start: true });

      // Check at 25% progress
      vi.advanceTimersByTime(250);
      await waitFor(() => {
        expect(result.current).toBeGreaterThan(0);
        expect(result.current).toBeLessThan(100);
      });

      // Check at 50% progress
      vi.advanceTimersByTime(250);
      await waitFor(() => {
        expect(result.current).toBeGreaterThan(0);
        expect(result.current).toBeLessThan(100);
      });

      // Check at 75% progress
      vi.advanceTimersByTime(250);
      await waitFor(() => {
        expect(result.current).toBeGreaterThan(0);
        expect(result.current).toBeLessThan(100);
      });

      // Complete at 100%
      vi.advanceTimersByTime(250);
      await waitFor(() => {
        expect(result.current).toBe(100);
      });
    });

    it('should use ease-out animation curve', async () => {
      const { result, rerender } = renderHook(
        ({ start }) => useCounterAnimation(100, 1000, start),
        { initialProps: { start: false } }
      );

      rerender({ start: true });

      const values: number[] = [];

      // Sample values at different points
      for (let i = 0; i <= 10; i++) {
        vi.advanceTimersByTime(100);
        await waitFor(() => {
          values.push(result.current);
        });
      }

      // With ease-out, early increments should be larger than later ones
      const firstHalfIncrement = values[5] - values[0];
      const secondHalfIncrement = values[10] - values[5];
      
      expect(firstHalfIncrement).toBeGreaterThan(secondHalfIncrement);
    });
  });

  describe('Start/Stop Behavior', () => {
    it('should reset to 0 when start is false', async () => {
      const { result, rerender } = renderHook(
        ({ start }) => useCounterAnimation(100, 1000, start),
        { initialProps: { start: true } }
      );

      vi.advanceTimersByTime(500);

      await waitFor(() => {
        expect(result.current).toBeGreaterThan(0);
      });

      // Stop animation
      rerender({ start: false });

      await waitFor(() => {
        expect(result.current).toBe(0);
      });
    });

    it('should restart animation when start changes from false to true', async () => {
      const { result, rerender } = renderHook(
        ({ start }) => useCounterAnimation(100, 1000, start),
        { initialProps: { start: false } }
      );

      expect(result.current).toBe(0);

      // Start animation
      rerender({ start: true });
      vi.advanceTimersByTime(1000);

      await waitFor(() => {
        expect(result.current).toBe(100);
      });

      // Stop and restart
      rerender({ start: false });
      await waitFor(() => {
        expect(result.current).toBe(0);
      });

      rerender({ start: true });
      vi.advanceTimersByTime(1000);

      await waitFor(() => {
        expect(result.current).toBe(100);
      });
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero as target value', async () => {
      const { result, rerender } = renderHook(
        ({ start }) => useCounterAnimation(0, 1000, start),
        { initialProps: { start: false } }
      );

      rerender({ start: true });
      vi.advanceTimersByTime(1000);

      await waitFor(() => {
        expect(result.current).toBe(0);
      });
    });

    it('should handle large target values', async () => {
      const { result, rerender } = renderHook(
        ({ start }) => useCounterAnimation(10000, 1000, start),
        { initialProps: { start: false } }
      );

      rerender({ start: true });
      vi.advanceTimersByTime(1000);

      await waitFor(() => {
        expect(result.current).toBe(10000);
      });
    });

    it('should handle very short durations', async () => {
      const { result, rerender } = renderHook(
        ({ start }) => useCounterAnimation(100, 10, start),
        { initialProps: { start: false } }
      );

      rerender({ start: true });
      vi.advanceTimersByTime(10);

      await waitFor(() => {
        expect(result.current).toBe(100);
      });
    });
  });

  describe('Cleanup', () => {
    it('should cancel animation on unmount', async () => {
      const cancelAnimationFrameSpy = vi.spyOn(window, 'cancelAnimationFrame');
      
      const { unmount, rerender } = renderHook(
        ({ start }) => useCounterAnimation(100, 1000, start),
        { initialProps: { start: false } }
      );

      rerender({ start: true });
      vi.advanceTimersByTime(500);

      unmount();

      expect(cancelAnimationFrameSpy).toHaveBeenCalled();
    });
  });
});
