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
          reason VARCHAR(45)
          )
      `);
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
