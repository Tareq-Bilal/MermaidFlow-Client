import { useEffect, useState } from "react";

const THEMES_URL = "/api/themes/Themes/names";

export interface UseThemesResult {
  themes: string[];
  loading: boolean;
  error: string | null;
}

export function useThemes(): UseThemesResult {
  const [themes, setThemes] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetch(THEMES_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`${res.status}`);
        return res.json() as Promise<string[]>;
      })
      .then((data) => {
        if (cancelled) return;
        setThemes(data.map((t) => t.toLowerCase()));
      })
      .catch((err) => {
        console.error("[useThemes]", err);
        if (!cancelled) {
          setError(err.message);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { themes, loading, error };
}
