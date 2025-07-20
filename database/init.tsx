const createDb = async (db: any) => {
  try {
    await db.execAsync(`
    CREATE TABLE IF NOT EXISTS CompterEneo (
        idCompterEneo INT NOT NULL AUTO_INCREMENT,
        label VARCHAR(45) NULL,
        number INT NULL,
    `);

    await db.execAsync(`
        CREATE TABLE IF NOT EXISTS CanalAbo (
        idCanalAbo INT NOT NULL AUTO_INCREMENT,
        abonementNumber INT NULL,
        label VARCHAR(45) NULL,
    `);

    await db.execAsync(`
        CREATE TABLE IF NOT EXISTS Daily_Report (
        idDaily_Report INT NOT NULL AUTO_INCREMENT,
        amount INT NULL,
        reason VARCHAR(45) NULL,
    `);

    await db.execAsync(`
    CREATE TABLE IF NOT EXISTS Subscription (
        idTransaction INT NOT NULL AUTO_INCREMENT,
        date DATETIME NULL,
        endDate DATETIME NULL,
        amount INT NULL,
        token INT NULL,
        subscriber_type VARCHAR(45) NULL,
        subscriber_id VARCHAR(45) NOT NULL,
    `);
  } catch (error) {
    console.error(error)
  }
};
