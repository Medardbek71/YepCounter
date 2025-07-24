import { compterQueries } from "@/database/query";
import * as SQLite from "expo-sqlite";

interface DatabaseResponse<T = any> {
  success?: boolean;
  data?: T;
  error?: any;
  insertedId?: number;
  change?: number;
}

class DatabaseService {
  private db: SQLite.SQLiteDatabase | null;
  constructor() {
    this.db = null;
  }

  async initDb(): Promise<SQLite.SQLiteDatabase> {
    if (!this.db) {
      this.db = await SQLite.openDatabaseAsync("MoneyLook.db");
    }
    return this.db;
  }

  async createCompter(
    label: string,
    number: string
  ): Promise<DatabaseResponse> {
    const db = await this.initDb();
    try {
      const results = await db.runAsync(compterQueries.createCompter, [
        label,
        number,
      ]);
      return {
        success: true,
        insertedId: results.lastInsertRowId,
      };
    } catch (error) {
      console.error("erreur lors de la création du compteur", error);
      return {
        success: false,
        error,
      };
    }
  }

  async getAllCompter(): Promise<DatabaseResponse> {
    const db = await this.initDb();
    try {
      const results = await db.getAllAsync(compterQueries.getAllCompter);
      return {
        success: true,
        data: results,
      };
    } catch (error) {
      console.error(
        "nous rencontrons une erreur lors de la recuperation de tous les utilisateurs",
        error
      );
      return {
        success: false,
        error,
      };
    }
  }

  async getCompterById(id: number): Promise<DatabaseResponse> {
    const db = await this.initDb();
    try {
      const results = await db?.getFirstAsync(compterQueries.getCompterById, [
        id,
      ]);
      return {
        success: true,
        data: results,
      };
    } catch (error) {
      console.error("erreur lors de la recuperation du compteur", error);
      return {
        success: false,
        error,
      };
    }
  }

  async deleteCompter(id: number): Promise<DatabaseResponse> {
    const db = await this.initDb();
    try {
      const results = db.runAsync(compterQueries.deleteCompter, [id]);
      return {
        success: true,
        data: results,
      };
    } catch (error) {
      console.error("erreur lors de la suppression du compteur", error);
      return {
        success: false,
        error,
      };
    }
  }
}

const databaseService = new DatabaseService();
export default databaseService;
