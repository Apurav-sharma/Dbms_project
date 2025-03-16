import mysql from "mysql2/promise";

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "PT@run45", 
  database: "payment"
});
export default db;