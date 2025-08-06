import * as SQLite from "expo-sqlite";

export const initDatabase = async () => {
  const db = await SQLite.openDatabaseAsync("MoneyLook.db");
  try {
    try {
      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS CompterEneo (
          idCompterEneo INTEGER PRIMARY KEY,
          label VARCHAR(45),
          number TEXT,
          lastSubscription DATETIME
        )
        `);
    } catch (error) {
      console.error(
        "erreur lors de la creation de la table compterEneo",
        error
      );
    }
    try {
      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS CanalAbo (
          idCanalAbo INTEGER PRIMARY KEY,
          abonementNumber INTEGER ,
          label VARCHAR(45),
          lastSubscription DATETIME
        )
      `);
    } catch (error) {
      console.error("erreur lors de la creation de la table CanalAbo", error);
    }
    try {
      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS Daily_Report (
          idDaily_Report INTEGER PRIMARY KEY,
          amount INTEGER ,
          reason VARCHAR ,
          created_at DATE 
          )
      `);
      console.log("Creation reussite de la table report");
    } catch (error) {
      console.error(
        "erreur lors de la creation de la table Daily_Report",
        error
      );
    }
    try {
      await db.execAsync(`
      CREATE TABLE IF NOT EXISTS Subscription (
        idSubscription INTEGER PRIMARY KEY,
        date DATETIME ,
        endDate DATETIME ,
        amount INTEGER ,
        token INTEGER ,
        subscriber_type VARCHAR(45) ,
        subscriber_id VARCHAR(45)
        )
      `);
    } catch (error) {
      console.error(
        "erreur lors de la creation de la table Subscription",
        error
      );
    }
    console.log("Base de donnée initialisé avec success");
    return db;
  } catch (error) {
    console.error("Erreur de l'initialisation de la base de donnée", error);
    throw error;
  }
};

/**
 * Réinitialise complètement la base de données
 * Supprime toutes les tables et les recrée
 */
export const resetDatabase = async () => {
  try {
    const db = await SQLite.openDatabaseAsync("MoneyLook.db");

    console.log("Début de la réinitialisation de la base de données...");

    // Supprimer toutes les tables existantes
    const tablesToDrop = [
      "CompterEneo",
      "CanalAbo",
      "Daily_Report",
      "Subscription",
    ];

    for (const tableName of tablesToDrop) {
      try {
        await db.execAsync(`DROP TABLE IF EXISTS ${tableName}`);
        console.log(`Table ${tableName} supprimée avec succès`);
      } catch (error) {
        console.error(
          `Erreur lors de la suppression de la table ${tableName}:`,
          error
        );
      }
    }

    // Fermer la base de données actuelle
    await db.closeAsync();

    // Réinitialiser la base de données en appelant initDatabase
    const newDb = await initDatabase();

    console.log("Base de données réinitialisée avec succès !");
    return newDb;
  } catch (error) {
    console.error(
      "Erreur lors de la réinitialisation de la base de données:",
      error
    );
    throw error;
  }
};

/**
 * Vide toutes les données des tables sans supprimer leur structure
 * Alternative plus douce à resetDatabase
 */
export const clearAllData = async () => {
  try {
    const db = await SQLite.openDatabaseAsync("MoneyLook.db");

    console.log("Début de la suppression de toutes les données...");

    // Liste des tables à vider
    const tablesToClear = [
      "CompterEneo",
      "CanalAbo",
      "Daily_Report",
      "Subscription",
    ];

    // Commencer une transaction pour s'assurer que tout se passe bien
    await db.execAsync("BEGIN TRANSACTION");

    try {
      for (const tableName of tablesToClear) {
        await db.execAsync(`DELETE FROM ${tableName}`);
        console.log(`Données supprimées de la table ${tableName}`);
      }

      // Remettre à zéro les compteurs auto-increment
      await db.execAsync("DELETE FROM sqlite_sequence");

      await db.execAsync("COMMIT");
      console.log("Toutes les données ont été supprimées avec succès !");
    } catch (error) {
      await db.execAsync("ROLLBACK");
      throw error;
    }

    return db;
  } catch (error) {
    console.error("Erreur lors de la suppression des données:", error);
    throw error;
  }
};
