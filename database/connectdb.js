import mysql from "mysql2/promise";

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "IIITV@icd#5560711", 
  database: "project"
});
export default db;