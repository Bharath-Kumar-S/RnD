import { settings } from "@/settings";
import { useQuery } from "@tanstack/react-query";

const getPrice = async (currency: string) => {
  const response = await fetch(
    `${settings.api.baseUrl}/price?symbol=${currency}`
  );

  if (!response.ok) {
    throw new Error(
      `Error fetching price for ${currency}, status: ${response.status}`
    );
  }

  const data = await response.json();
  return data;
};

export const useGetPrice = (currency: string) => {
  const queryCacheTime =
    parseInt(import.meta.env.VITE_QUERY_CACHE_TIME) || 1800000; // Cache time (30 minutes)

  return useQuery({
    queryKey: ["price", currency],
    queryFn: () => getPrice(currency),
    staleTime: queryCacheTime,
    throwOnError: false,
    retry: false,
  });
};
