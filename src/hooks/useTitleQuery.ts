"use client";

import { useQuery } from "@tanstack/react-query";
import { getTitleFromUrl } from "@/utils/getTitleFromUrl";

interface UseTitleQueryOptions {
  enabled?: boolean;
  staleTime?: number;
  gcTime?: number;
}

export const useTitleQuery = (url: string, options: UseTitleQueryOptions = {}) => {
  const {
    enabled = true,
    staleTime = 5 * 60 * 1000, // 5분
    gcTime = 10 * 60 * 1000, // 10분
  } = options;

  const query = useQuery({
    queryKey: ["title", url], // url이 바뀔 때마다 새로운 쿼리
    queryFn: async () => {
      console.log(`Fetching title for: ${url}`);
      return await getTitleFromUrl(url);
    },
    enabled: enabled && !!url, // url이 있을 때만 실행
    staleTime,
    gcTime,
    retry: (failureCount, error) => {
      // 네트워크 에러가 아니면 재시도 안함
      if (error?.message?.includes("404") || error?.message?.includes("403")) {
        return false;
      }
      return failureCount < 1; // 1번만 재시도
    },
    retryDelay: 1000, // 1초 후 재시도
  });

  return {
    title: query.data || null,
    loading: query.isLoading,
    error: query.error,
    isSuccess: query.isSuccess,
    isFetching: query.isFetching, // 백그라운드 refetch 중인지
    refetch: query.refetch, // 수동 refetch
  };
};
