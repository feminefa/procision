import { useEffect, useState } from "react";
import { type ISurgicalCase } from "~/_shared/interface";


export interface IUseSearch {
  searchResult: ISurgicalCase[];
  search: (query: string) => void;
}

export const useSearch = (): IUseSearch => {
  const [searchResult, setSearchResult] = useState<ISurgicalCase[]>([]);
  const useQuery = api.surgicalCase.search.useQuery({ query: "H25.9" });
  // useEffect(() => {

  // }, []);
  const search = (query: string) => {
    setSearchResult([]);
  };

  return {
    searchResult,
    search,
  };
};
