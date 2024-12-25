import { fetcher } from "./fetcher";
import { ReactNode } from "react";
import { SWRConfig } from "swr";

type TApiContextProviderProps = {
  children: ReactNode;
};

export function ApiContextProvider(props: TApiContextProviderProps) {
  return <SWRConfig value={{ fetcher }}>{props.children}</SWRConfig>;
}
