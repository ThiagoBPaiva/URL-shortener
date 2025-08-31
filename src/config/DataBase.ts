import mysql from "mysql2/promise";
import * as dotenv from "dotenv";

dotenv.config();

export const pool = mysql.createPool({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0
});

(async () => {
	try {
		const conn = await pool.getConnection();
		console.log("✅ Conectando com o banco MySQL");
		conn.release();
	} catch (err) {
		console.error("❌ Erro ao conectar:", err);
	}
})();