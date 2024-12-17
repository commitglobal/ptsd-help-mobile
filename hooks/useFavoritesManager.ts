import { addToFavoritesMutation, removeFromFavoritesMutation, useFavorite } from '@/services/favorites.service';

export const useFavoritesManager = (toolId: string) => {
  const { data: favorite } = useFavorite(toolId);
  const { mutate: addToFavorites } = addToFavoritesMutation(toolId);
  const { mutate: removeFromFavorites } = removeFromFavoritesMutation(toolId);

  const handleAddToFavorites = () => {
    addToFavorites({
      toolId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      deletedAt: null,
    });
  };

  return {
    favorite,
    handleAddToFavorites,
    removeFromFavorites,
  };
};
