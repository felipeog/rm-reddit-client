import { useCallback, useState } from "react";

export function useBoardExists() {
  const [isLoading, setIsLoading] = useState(false);

  const checkBoardExistance = useCallback(async (board: string) => {
    setIsLoading(true);

    try {
      const response = await fetch(
        `https://www.reddit.com/r/${board}/about.json`
      );

      return response.ok && response.status === 200;
    } catch (error) {
      alert("Error checking board existance.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { isLoading, checkBoardExistance };
}
