import { skipToken, useQuery, UseQueryResult } from '@tanstack/react-query';
import { FogglesConfig } from './foggles.type';
import { fetchFoggles } from './foggles.fetcher';

export const useFoggles = (countryCode: string): UseQueryResult<FogglesConfig> => {
  return useQuery({
    queryKey: ['foggles', countryCode],
    queryFn: !countryCode
      ? skipToken
      : async () => {
          console.log('🐸 useFoggles');
          return fetchFoggles(countryCode);
        },
  });
};
