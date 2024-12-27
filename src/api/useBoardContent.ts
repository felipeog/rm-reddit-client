import { useCallback } from "react";
import useSWRInfinite from "swr/infinite";

type TData = {
  name: string;
  title: string;
  ups: number;
  url: string;
};

type TResponse = {
  data: {
    after: string;
    dist: number;
    children: { data: TData }[];
  };
};

export function useBoardContent(board: string) {
  const { data, isLoading, isValidating, setSize } =
    useSWRInfinite<TResponse>(getKey);

  function getKey(pageIndex: number, previousPageData: TResponse) {
    if (previousPageData && !previousPageData.data) return null;
    if (pageIndex === 0) return `/${board}.json`;
    return (
      `/${board}/hot.json` +
      `?after=${previousPageData.data.after}` +
      `&count=${previousPageData.data.dist}`
    );
  }

  const loadMore = useCallback(() => {
    setSize((prevSize) => prevSize + 1);
  }, [setSize]);

  const refresh = useCallback(() => {
    setSize(1);
  }, [setSize]);

  const hasMore =
    Array.isArray(data) && data[data.length - 1].data.after !== null;
  const boardContent = data?.reduce((acc: TData[], cur) => {
    const items = cur.data.children.map((children) => children.data);
    acc.push(...items);
    return acc;
  }, []);

  return {
    loadMore,
    hasMore,
    refresh,
    isLoading: isLoading || isValidating,
    boardContent: boardContent || [],
  };
}
