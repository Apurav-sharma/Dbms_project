import mysql from "mysql2/promise";

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Arjun@6918", 
  database: "project"
});
export default db;