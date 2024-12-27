import { fetcher } from "./fetcher";
import { useCallback, useState } from "react";
import { useSWRConfig } from "swr";

export function useBoardExists() {
  const { cache, mutate } = useSWRConfig();
  const [isLoading, setIsLoading] = useState(false);

  const checkBoardExistence = useCallback(
    async (board: string) => {
      const key = `useBoardExists-${board}`;

      if (cache.get(key)) return cache.get(key)?.data;

      setIsLoading(true);

      try {
        const response = await fetcher(`/${board}.json`);
        const exists = response?.error !== 404;

        await mutate(key, exists, false);

        return exists;
      } catch (error) {
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [cache, mutate]
  );

  return { isLoading, checkBoardExistence };
}
