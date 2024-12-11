import { skipToken, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import favouritesRepository, { Favourite } from '@/db/repositories/favourites.repository';

const favouritesKeys = {
  details: (toolId: string) => ['favourites', toolId] as const,
  addFavourite: (toolId: string) => ['favourites', 'add', toolId] as const,
  removeFavourite: (toolId: string) => ['favourites', 'remove', toolId] as const,
};

export const useFavourite = (toolId: string) => {
  return useQuery({
    queryKey: favouritesKeys.details(toolId),
    queryFn: toolId ? () => favouritesRepository.getFavouritesByToolId(toolId) : skipToken,
    gcTime: 0,
    staleTime: 0,
  });
};

export const addToFavouritesMutation = (toolId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: favouritesKeys.addFavourite(toolId),
    mutationFn: (favourite: Favourite) => favouritesRepository.addToFavourites(favourite),

    // optimistic update
    onMutate: async (favourite: Favourite) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: favouritesKeys.details(toolId) });

      // Snapshot the previous value
      const previousFavourite = queryClient.getQueryData(favouritesKeys.details(favourite.toolId));

      // Optimistically update to the new value
      queryClient.setQueryData(favouritesKeys.details(favourite.toolId), favourite);

      // Return a context object with the snapshotted value
      return { previousFavourite };
    },
    onError: (err) => {
      console.log('🔴🔴🔴 ERROR IN ADD TO FAVOURITES MUTATION 🔴🔴🔴', err);
    },
    onSettled: () => {
      return queryClient.invalidateQueries({ queryKey: favouritesKeys.details(toolId) });
    },
  });
};

export const removeFromFavouritesMutation = (toolId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: favouritesKeys.removeFavourite(toolId),
    mutationFn: () => favouritesRepository.removeFromFavourites(toolId),

    // optimistic update
    // optimistic update
    onMutate: async () => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: favouritesKeys.details(toolId) });

      // Snapshot the previous value
      const previousFavourite = queryClient.getQueryData(favouritesKeys.details(toolId));

      // Optimistically update to the new value
      queryClient.setQueryData(favouritesKeys.details(toolId), null);

      // Return a context object with the snapshotted value
      return { previousFavourite };
    },
    onError: (err) => {
      console.log('🔴🔴🔴 ERROR IN REMOVE FROM FAVOURITES MUTATION 🔴🔴🔴', err);
    },
    onSettled: () => {
      return queryClient.invalidateQueries({ queryKey: favouritesKeys.details(toolId) });
    },
  });
};
