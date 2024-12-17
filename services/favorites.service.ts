import favoritesRepository, { Favorite } from '@/db/repositories/favorites.repository';
import { skipToken, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const favoritesKeys = {
  details: (toolId: string) => ['favorites', toolId] as const,
  addfavorite: (toolId: string) => ['favorites', 'add', toolId] as const,
  removefavorite: (toolId: string) => ['favorites', 'remove', toolId] as const,
};

export const useFavorite = (toolId: string) => {
  return useQuery({
    queryKey: favoritesKeys.details(toolId),
    queryFn: toolId ? () => favoritesRepository.getFavoritesByToolId(toolId) : skipToken,
    gcTime: 0,
    staleTime: 0,
  });
};

export const addToFavoritesMutation = (toolId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: favoritesKeys.addfavorite(toolId),
    mutationFn: (favorite: Favorite) => favoritesRepository.addToFavorites(favorite),

    // optimistic update
    onMutate: async (favorite: Favorite) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: favoritesKeys.details(toolId) });

      // Snapshot the previous value
      const previousfavorite = queryClient.getQueryData(favoritesKeys.details(favorite.toolId));

      // Optimistically update to the new value
      queryClient.setQueryData(favoritesKeys.details(favorite.toolId), favorite);

      // Return a context object with the snapshotted value
      return { previousfavorite };
    },
    onError: (err) => {
      console.log('🔴🔴🔴 ERROR IN ADD TO favoriteS MUTATION 🔴🔴🔴', err);
    },
    onSettled: () => {
      return queryClient.invalidateQueries({ queryKey: favoritesKeys.details(toolId) });
    },
  });
};

export const removeFromFavoritesMutation = (toolId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: favoritesKeys.removefavorite(toolId),
    mutationFn: () => favoritesRepository.removeFromFavorites(toolId),

    // optimistic update
    // optimistic update
    onMutate: async () => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: favoritesKeys.details(toolId) });

      // Snapshot the previous value
      const previousfavorite = queryClient.getQueryData(favoritesKeys.details(toolId));

      // Optimistically update to the new value
      queryClient.setQueryData(favoritesKeys.details(toolId), null);

      // Return a context object with the snapshotted value
      return { previousfavorite };
    },
    onError: (err) => {
      console.log('🔴🔴🔴 ERROR IN REMOVE FROM favoriteS MUTATION 🔴🔴🔴', err);
    },
    onSettled: () => {
      return queryClient.invalidateQueries({ queryKey: favoritesKeys.details(toolId) });
    },
  });
};
