import { fetcher } from "./fetcher";
import { useCallback, useState } from "react";
import { useSWRConfig } from "swr";

export function useBoardExists() {
  const { cache, mutate } = useSWRConfig();
  const [isLoading, setIsLoading] = useState(false);

  const checkBoardExistence = useCallback(
    async (
      board: string
    ): Promise<{
      exists: boolean;
      error: string | null;
    }> => {
      const key = `useBoardExists-${board}`;

      if (cache.get(key)) return cache.get(key)?.data;

      setIsLoading(true);

      try {
        const response = await fetcher(`/${board}.json`);
        const error = Boolean(response?.error)
          ? `${response.message}: ${response.reason}`
          : null;
        const exists = !error;

        await mutate(key, exists, false);

        return { exists, error };
      } catch (error) {
        return { exists: false, error: `Internal error.` };
      } finally {
        setIsLoading(false);
      }
    },
    [cache, mutate]
  );

  return { isLoading, checkBoardExistence };
}
