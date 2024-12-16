import db from '../db';
import { DatabaseError } from '../helpers';
import { favorites } from '../schema/favorites';
import { eq } from 'drizzle-orm';

export type Favorite = Omit<typeof favorites.$inferSelect, 'id'>;

class FavoritesRepository {
  private databaseInstance = db;

  constructor(db: any) {
    this.databaseInstance = db;
  }

  public getFavorites = () => {
    return this.databaseInstance.select().from(favorites);
  };

  public getFavoritesByToolId = async (toolId: string) => {
    try {
      const $favorites = await this.databaseInstance.select().from(favorites).where(eq(favorites.toolId, toolId));
      if (!$favorites.length) {
        return null;
      }
      return $favorites[0];
    } catch (error) {
      console.error('Failed to get favorite by toolId:', error);
      throw new DatabaseError('Failed to get favorite by toolId from database');
    }
  };

  public addToFavorites = async (favorite: Favorite): Promise<void> => {
    try {
      await this.databaseInstance.insert(favorites).values(favorite);
    } catch (error) {
      console.error('Failed to create favorite:', error);
      throw new DatabaseError('Failed to create favorite in database');
    }
  };

  public removeFromFavorites = async (toolId: string): Promise<void> => {
    try {
      await this.databaseInstance.delete(favorites).where(eq(favorites.toolId, toolId));
    } catch (error) {
      console.error('Failed to remove favorite:', error);
      throw new DatabaseError('Failed to remove favorite in database');
    }
  };
}

const favoritesRepository = new FavoritesRepository(db);

export default favoritesRepository;
