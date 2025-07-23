export const compterQueries = {
  createCompter: `INSERT INTO compterEneo (label , number) VALUES (?,?)`,
  getAllCompter: `SELECT * FROM compterEneo`,
  getCompterById: `SELECT * FROM compterEneo WHERE idCompterEneo ?`,
  deleteCompter: `DELETE FROM compterEneo WHERE idCompterEneo = ?`,
};

export const canalQueries = {
  createCanal: `INSERT INTO CanalAbo (label , abonementNumber) VALUES (?,?)`,
  getAllCanal: `SELECT * FROM CanalAbo`,
  getCanalById: `SELECT * FROM CanalAbo WHERE idCanalAbo = ?`,
  deleteCanal: `DELETE FROM CanalAbo WHERE idCanalAbo = ?`,
};

export const daily_ReportQuery = {
  createReport: `INSERT INTO Daily_Report ( amount , reason ) VALUES (?,?)`,
  getAllReport: `SELECT * FROM Daily_Report`,
  getReportById: `SELECT * FROM Daily_Report WHERE idDaily_Report = ?`,
  deleteReport: `DELETE FROM Daily_Report WHERE idDaily_Report = ?`,
};

export const subscriptionQueries = {
  createSouscription: `INSERT INTO Souscription (date , endDate , amount , token , subscriber_type , suscriber_id) VALUES (${Date.now()},?,?,?,?,?)`,
  getAllSouscription: `SELECT * FROM Souscription`,
  getReportById: `SELECT * FROM Souscription WHERE idSouscription = ?`,
  deleteSouscription: `SELECT * FROM Souscription WHERE idSouscription = ?`,
};
