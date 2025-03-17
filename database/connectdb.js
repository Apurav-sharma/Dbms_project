import mysql from "mysql2/promise"; // ✅ Use mysql2 instead of mssql
import fs from "fs";

const db = mysql.createPool({ // ✅ Use createPool for multiple queries
  host: "proj.mysql.database.azure.com",
  user: "apurav0711",
  password: "IIITV@icd#5560711",
  database: "project",
  port: 3306,
  ssl: {
    rejectUnauthorized: true,
    ca: fs.readFileSync("C:/Users/Apurav/Downloads/DigiCertGlobalRootCA.crt.pem"),
  },
});

export default db;