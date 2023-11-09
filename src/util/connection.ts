import "dotenv/config";
import mysql from "mysql2";



  const pool = mysql.createPool({
    host: process.env.SQL_URL,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DBNAME,
    port: parseInt(process.env.SQL_PORT || ""),
  });


export const QueryHandler = async (query: string, fields?: any) => {
  const [result] = await pool.promise().query(query, fields);
  return result;
};

export const EndConnection = async () => {
  return pool.end()
};
