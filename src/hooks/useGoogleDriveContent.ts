import { useState, useEffect } from 'react';
import { googleDriveService } from '../services/googleDriveService';

interface UseGoogleDriveContentOptions {
  fallbackData?: any[];
  cacheTime?: number; // in milliseconds
}

/**
 * Custom hook to fetch content from Google Drive with caching and fallback
 */
export function useGoogleDriveContent<T>(
  fetchFunction: () => Promise<T[]>,
  cacheKey: string,
  options: UseGoogleDriveContentOptions = {}
) {
  const [data, setData] = useState<T[]>(options.fallbackData || []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        if (isMounted) {
          setLoading(true);
          setError(null);
        }

        // Check if Google Drive is configured
        const apiKey = import.meta.env.VITE_GOOGLE_DRIVE_API_KEY;
        if (!apiKey) {
          // No Google Drive configured, use fallback data immediately
          if (options.fallbackData && isMounted) {
            setData(options.fallbackData);
          }
          if (isMounted) setLoading(false);
          return;
        }

        // Check cache first
        const cacheTime = options.cacheTime || 5 * 60 * 1000; // 5 minutes default
        const cached = getCachedData(cacheKey, cacheTime);
        
        if (cached && isMounted) {
          setData(cached);
          setLoading(false);
          return;
        }

        // Fetch fresh data
        const freshData = await fetchFunction();
        
        if (isMounted) {
          setData(freshData);
          setCachedData(cacheKey, freshData);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Failed to fetch data');
          // Use fallback data if available
          if (options.fallbackData) {
            setData(options.fallbackData);
          }
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [cacheKey]); // Only depend on cacheKey to prevent infinite loops

  return { data, loading, error };
}

/**
 * Hook specifically for projects
 */
export function useProjects(fallbackData?: any[]) {
  return useGoogleDriveContent(
    googleDriveService.getProjects.bind(googleDriveService),
    'projects',
    { fallbackData, cacheTime: 10 * 60 * 1000 } // 10 minutes cache
  );
}

/**
 * Hook specifically for newsletters
 */
export function useNewsletters(fallbackData?: any[]) {
  return useGoogleDriveContent(
    googleDriveService.getNewsletters.bind(googleDriveService),
    'newsletters',
    { fallbackData, cacheTime: 15 * 60 * 1000 } // 15 minutes cache
  );
}

/**
 * Hook specifically for programs
 */
export function usePrograms(fallbackData?: any[]) {
  return useGoogleDriveContent(
    googleDriveService.getPrograms.bind(googleDriveService),
    'programs',
    { fallbackData, cacheTime: 30 * 60 * 1000 } // 30 minutes cache
  );
}

/**
 * Hook specifically for team
 */
export function useTeam(fallbackData?: any[]) {
  console.log('🚀 useTeam hook called with fallback data:', fallbackData);
  
  const result = useGoogleDriveContent(
    googleDriveService.getTeam.bind(googleDriveService),
    'team',
    { fallbackData, cacheTime: 60 * 60 * 1000 } // 1 hour cache
  );
  
  console.log('📊 useTeam hook result:', result);
  return result;
}

// Cache utilities
function getCachedData(key: string, maxAge: number): any[] | null {
  try {
    const cached = localStorage.getItem(`gdrive_${key}`);
    if (!cached) return null;

    const { data, timestamp } = JSON.parse(cached);
    const age = Date.now() - timestamp;

    if (age > maxAge) {
      localStorage.removeItem(`gdrive_${key}`);
      return null;
    }

    return data;
  } catch {
    return null;
  }
}

function setCachedData(key: string, data: any[]): void {
  try {
    const cacheData = {
      data,
      timestamp: Date.now()
    };
    localStorage.setItem(`gdrive_${key}`, JSON.stringify(cacheData));
  } catch {
    // Ignore cache errors
  }
}