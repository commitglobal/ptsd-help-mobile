import { addToFavouritesMutation, removeFromFavouritesMutation, useFavourite } from '@/services/favourites.service';

export const useFavouritesManager = (toolId: string) => {
  const { data: favourite } = useFavourite(toolId);
  const { mutate: addToFavourites } = addToFavouritesMutation(toolId);
  const { mutate: removeFromFavourites } = removeFromFavouritesMutation(toolId);

  const handleAddToFavourites = () => {
    addToFavourites({
      toolId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      deletedAt: null,
    });
  };

  return {
    favourite,
    handleAddToFavourites,
    removeFromFavourites,
  };
};
