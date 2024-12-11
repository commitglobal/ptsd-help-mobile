import db from '../db';
import { favourites } from '../schema/favourites';
import { DrizzleError, eq } from 'drizzle-orm';

export type Favourite = Omit<typeof favourites.$inferSelect, 'id'>;

class DatabaseError extends DrizzleError {
  constructor(message: string) {
    super({ message });
    this.name = 'DatabaseError';
  }
}

class FavouritesRepository {
  private databaseInstance = db;

  constructor(db: any) {
    this.databaseInstance = db;
  }

  public getFavourites = () => {
    return this.databaseInstance.select().from(favourites);
  };

  public getFavouritesByToolId = async (toolId: string) => {
    try {
      const $favourites = await this.databaseInstance.select().from(favourites).where(eq(favourites.toolId, toolId));
      if (!$favourites.length) {
        return null;
      }
      return $favourites[0];
    } catch (error) {
      console.error('Failed to get favourite by toolId:', error);
      throw new DatabaseError('Failed to get favourite by toolId from database');
    }
  };

  public addToFavourites = async (favourite: Favourite): Promise<void> => {
    try {
      await this.databaseInstance.insert(favourites).values(favourite);
    } catch (error) {
      console.error('Failed to create favourite:', error);
      throw new DatabaseError('Failed to create favourite in database');
    }
  };

  public removeFromFavourites = async (toolId: string): Promise<void> => {
    try {
      await this.databaseInstance.delete(favourites).where(eq(favourites.toolId, toolId));
    } catch (error) {
      console.error('Failed to remove favourite:', error);
      throw new DatabaseError('Failed to remove favourite in database');
    }
  };
}

const favouritesRepository = new FavouritesRepository(db);

export default favouritesRepository;
