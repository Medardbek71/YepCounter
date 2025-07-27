import {
  compterQueries,
  canalQueries,
  daily_ReportQuery,
} from "@/database/query";
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
  private isInitialized: boolean;

  constructor() {
    this.db = null;
    this.isInitialized = false;
  }

  async initDb(): Promise<SQLite.SQLiteDatabase> {
    if (!this.db) {
      try {
        this.db = await SQLite.openDatabaseAsync("MoneyLook.db");

        // IMPORTANT: Créer les tables si elles n'existent pas
        if (!this.isInitialized) {
          await this.createTables();
          this.isInitialized = true;
        }
      } catch (error) {
        console.error(
          "Erreur lors de l'ouverture de la base de données:",
          error
        );
        throw error;
      }
    }
    return this.db;
  }

  // Méthode pour créer les tables
  private async createTables(): Promise<void> {
    if (!this.db) return;

    try {
      // Créez votre table compteurs (adaptez selon votre schéma)
      await this.db.execAsync(`
        CREATE TABLE IF NOT EXISTS compteurs (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          label TEXT NOT NULL,
          number TEXT NOT NULL UNIQUE,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
      `);

      console.log("Tables créées avec succès");
    } catch (error) {
      console.error("Erreur lors de la création des tables:", error);
      throw error;
    }
  }

  async createCompter(
    label: string,
    number: string
  ): Promise<DatabaseResponse> {
    try {
      const db = await this.initDb();
      const results = await db.runAsync(compterQueries.createCompter, [
        label,
        number,
      ]);
      return {
        success: true,
        insertedId: results.lastInsertRowId,
      };
    } catch (error) {
      console.error("erreur lors de la création du compte canal", error);
      return {
        success: false,
        error,
      };
    }
  }

  async getAllCompter(): Promise<DatabaseResponse> {
    try {
      const db = await this.initDb();
      console.log("étoile de bonaberi");
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
    try {
      const db = await this.initDb();
      const results = await db.getFirstAsync(compterQueries.getCompterById, [
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
    try {
      const db = await this.initDb();
      const results = await db.runAsync(compterQueries.deleteCompter, [id]);
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

  async createCanal(label: string, number: number): Promise<DatabaseResponse> {
    try {
      const db = await this.initDb();
      const results = await db.runAsync(canalQueries.createCanal, [
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

  async getCanalById(id: number): Promise<DatabaseResponse> {
    try {
      const db = await this.initDb();
      const results = await db.getFirstAsync(canalQueries.getCanalById, [id]);
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

  async getAllCanal(): Promise<DatabaseResponse> {
    try {
      const db = await this.initDb();
      const results = await db.getAllAsync(canalQueries.getAllCanal);
      return {
        success: true,
        data: results,
      };
    } catch (error) {
      console.error(
        "nous rencontrons une erreur lors de la recuperation de tous les abonements",
        error
      );
      return {
        success: false,
        error,
      };
    }
  }

  async createReport(
    reason: string,
    amount: number
  ): Promise<DatabaseResponse> {
    try {
      const db = await this.initDb();
      const results = await db.runAsync(daily_ReportQuery.createReport, [
        reason,
        amount,
      ]);
      console.log("bilan ajouté");
      return {
        success: true,
        insertedId: results.lastInsertRowId,
      };
    } catch (error) {
      console.error("Nous rencontrons une erreur", error);
      return {
        success: false,
        error: error,
      };
    }
  }

  // Méthode pour fermer la base de données proprement
  async closeDb(): Promise<void> {
    if (this.db) {
      await this.db.closeAsync();
      this.db = null;
      this.isInitialized = false;
    }
  }

  // Méthode pour réinitialiser la base de données (utile pour debug)
  async resetDb(): Promise<void> {
    try {
      await this.closeDb();
      // Supprimer et recréer la base
      this.db = await SQLite.openDatabaseAsync("MoneyLook.db");
      await this.db.execAsync("DROP TABLE IF EXISTS compteurs;");
      await this.createTables();
      this.isInitialized = true;
    } catch (error) {
      console.error("Erreur lors de la réinitialisation:", error);
      throw error;
    }
  }
}

const databaseService = new DatabaseService();
export default databaseService;
