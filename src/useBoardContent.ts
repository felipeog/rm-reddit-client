import { useCallback, useEffect, useRef, useState } from "react";

type TData = {
  name: string;
  title: string;
  ups: number;
  downs: number;
  author: string;
  url: string;
  created: number;
};

type TResponse = {
  data: {
    after: string;
    dist: number;
    children: { data: TData }[];
  };
};

type TPagination = {
  after?: string;
  count?: number;
};

export function useBoardContent(board: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<TData[]>([]);
  const fetchRef = useRef(false);
  const paginationRef = useRef<TPagination>({});

  const getBoardContent = useCallback(async () => {
    if (fetchRef.current) return;

    fetchRef.current = true;
    setIsLoading(true);

    try {
      let url =
        `https://www.reddit.com/r/${board}/hot.json` +
        `?after=${paginationRef.current.after || ""}` +
        `&count=${paginationRef.current.count || ""}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Error loading board content.");
      }

      const json: TResponse = await response.json();
      if (!json?.data?.children) {
        throw new Error("Error loading board content.");
      }

      paginationRef.current.after = json.data.after;
      paginationRef.current.count = json.data.dist;

      const newData = json.data.children.map((children) => children.data);
      setData((prevData) => [...prevData, ...newData]);
    } catch (error) {
      alert("Error loading board content.");
      console.error(error);
    } finally {
      fetchRef.current = false;
      setIsLoading(false);
    }
  }, [board]);

  useEffect(() => {
    getBoardContent();
  }, [getBoardContent]);

  return {
    isLoading,
    loadMore: getBoardContent,
    boardContent: data,
  };
}
